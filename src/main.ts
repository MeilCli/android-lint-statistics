import * as core from "@actions/core";
import * as glob from "@actions/glob";
import * as fs from "fs";
import * as git from "./git";
import { Config, readConfig } from "./config";
import { parse } from "./parse";
import { calculate } from "./calculate";
import { readData, writeData, appendData } from "./data";
import { writeReport } from "./report";
import { renderSeverity, renderPriority, renderData } from "./chart";
import { Issues } from "./issues";

async function run() {
    let config: Config;
    let mainBranch: string;
    let isInitialBranch: boolean;
    const issuesList: Issues[] = [];
    try {
        config = readConfig();
        mainBranch = await git.echoCurrentBranch();
        const globber = await glob.create(config.lintXmlFilePath, {
            followSymbolicLinks: config.lintXmlFilePathFollowSymbolicLinks,
        });
        for await (const file of globber.globGenerator()) {
            const issues = await parse(fs.readFileSync(file).toString());
            issuesList.push(issues);
        }
        isInitialBranch = await git.checkoutDataBranch(config);
    } catch (error) {
        core.setFailed(error.message);
        return;
    }
    try {
        const report = calculate(issuesList);
        const data = readData(config);
        appendData(data, report);
        writeData(config, data);
        await git.commit(config, isInitialBranch);
        await git.pushDataBranch(config);

        writeReport(config, report);
        await renderSeverity(report, config.severityChartFilePath);
        await renderPriority(report, config.priorityChartFilePath);
        if (config.dataChartFilePath != null) {
            await renderData(data, config.dataChartFilePath);
        }
    } catch (error) {
        core.setFailed(error.message);
    } finally {
        await git.checkoutBranch(mainBranch);
    }
}

run();
