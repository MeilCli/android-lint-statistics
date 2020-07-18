import * as xml from "xml2js";
import * as core from "@actions/core";
import { XmlIssuesRoot } from "./entity";
import { Issues, Issue } from "./issues";

export async function parse(value: string): Promise<Issues> {
    core.info("before parse");
    const root = (await xml.parseStringPromise(value)) as XmlIssuesRoot;
    console.info(root);
    core.info("after parse");
    const issues: Issue[] = [];
    core.info("before for");
    for (const element of root.issues.issue) {
        issues.push({
            severity: element.$.severity,
            category: element.$.category,
            id: element.$.id,
            priority: parseInt(element.$.priority),
        } as Issue);
    }
    core.info("after for");
    return { issues: issues };
}
