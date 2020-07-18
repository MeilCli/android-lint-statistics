import * as fs from "fs";
import { Config } from "./config";

export interface Report {
    severity: Map<string, number>;
    category: Map<string, number>;
    id: Map<string, number>;
    priority: Map<number, number>;
}

export function writeReport(config: Config, report: Report) {
    const json = {
        severity: Array.from(report.severity.entries()),
        category: Array.from(report.category.entries()),
        id: Array.from(report.id.entries()),
        priority: Array.from(report.priority.entries()),
    };
    fs.writeFileSync(config.reportJsonFilePath, JSON.stringify(json, undefined, 4));

    const severity = toStringFromStringMap(report.severity);
    const category = toStringFromStringMap(report.category);
    const id = toStringFromStringMap(report.id);
    const priority = toStringFromNumberMap(report.priority);

    let text = "";
    text += "--severity--\n";
    text += `${severity}\n`;
    text += "--category--\n";
    text += `${category}\n`;
    text += "--id--\n";
    text += `${id}\n`;
    text += "--priority--\n";
    text += `${priority}\n`;

    fs.writeFileSync(config.reportTextFilePath, text);
}

function toStringFromStringMap(map: Map<string, number>): string {
    const keys = Array.from(map.keys()).sort();
    let result = "";
    for (const key of keys) {
        const value = map.get(key) ?? 0;
        result += `${key}: ${value}\n`;
    }
    return result;
}

function toStringFromNumberMap(map: Map<number, number>): string {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let result = "";
    for (const key of keys) {
        const value = map.get(key) ?? 0;
        result += `${key}: ${value}\n`;
    }
    return result;
}
