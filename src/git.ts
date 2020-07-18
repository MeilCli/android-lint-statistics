import * as exec from "@actions/exec";
import { Config } from "./config";

export async function echoCurrentBranch(): Promise<string> {
    const execOption: exec.ExecOptions = { ignoreReturnCode: true };
    let stdout = "";
    execOption.listeners = {
        stdout: (data: Buffer) => {
            stdout += data.toString();
        },
    };

    await exec.exec("git symbolic-ref --short HEAD", undefined, execOption);

    return stdout;
}

export async function checkoutDataBranch(config: Config) {
    if (config.dataBranch == null) {
        return;
    }

    const hasBranch = await hasDataBranch(config);
    if (hasBranch) {
        await exec.exec(`git checkout -b ${config.dataBranch}`);
    } else {
        await exec.exec(`git checkout --orphan ${config.dataBranch}`);
    }
}

export async function checkoutBranch(branch: string) {
    await exec.exec(`git checkout ${branch}`);
}

export async function commit(config: Config) {
    await exec.exec(`git config --local user.name ${config.dataCommitUser}`);
    await exec.exec(`git config --local user.emaol ${config.dataCommitEmail}`);
    await exec.exec("git rm -rf .");
    await exec.exec(`git add ${config.dataJsonFilePath}`);
    await exec.exec("git commit --no-edit -m update");
}

export async function pushDataBranch(config: Config) {
    const remote = `https://x-access-token:${config.githubToken}@github.com/${config.repository}.git`;
    await exec.exec(`git push ${remote} HEAD:${config.dataBranch}`);
}

async function hasDataBranch(config: Config): Promise<boolean> {
    if (config.dataBranch == null) {
        return false;
    }

    const execOption: exec.ExecOptions = { ignoreReturnCode: true };
    let stdout = "";
    execOption.listeners = {
        stdout: (data: Buffer) => {
            stdout += data.toString();
        },
    };

    await exec.exec("git fetch -p");
    await exec.exec("git branch", undefined, execOption);

    return 0 <= stdout.split(" ").indexOf(config.dataBranch);
}
