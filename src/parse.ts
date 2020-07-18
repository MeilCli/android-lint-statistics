import * as xml from "xml2js";
import { XmlIssuesRoot } from "./entity";
import { Issues, Issue } from "./issues";

export async function parse(value: string): Promise<Issues> {
    const root = (await xml.parseStringPromise(value)) as XmlIssuesRoot;
    const issues: Issue[] = [];

    for (const element of root.issues.issue) {
        issues.push({
            severity: element.$.severity,
            category: element.$.category,
            id: element.$.id,
            priority: parseInt(element.$.priority),
        } as Issue);
    }

    return { issues: issues };
}
