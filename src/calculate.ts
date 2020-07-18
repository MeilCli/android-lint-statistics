import { Issues } from "./issues";
import { Report } from "./report";

export function calculate(value: Issues[]): Report {
    const severity = new Map<string, number>();
    const category = new Map<string, number>();
    const id = new Map<string, number>();
    const priority = new Map<number, number>();

    for (const issues of value) {
        for (const issue of issues.issues) {
            const severityValue = severity.get(issue.severity);
            if (severityValue != undefined) {
                severity.set(issue.severity, severityValue + 1);
            } else {
                severity.set(issue.severity, 1);
            }

            const categoryValue = category.get(issue.category);
            if (categoryValue != undefined) {
                category.set(issue.category, categoryValue + 1);
            } else {
                category.set(issue.category, 1);
            }

            const idValue = id.get(issue.id);
            if (idValue != undefined) {
                id.set(issue.id, idValue + 1);
            } else {
                id.set(issue.id, 1);
            }

            const priorityValue = priority.get(issue.priority);
            if (priorityValue != undefined) {
                priority.set(issue.priority, priorityValue + 1);
            } else {
                priority.set(issue.priority, 1);
            }
        }
    }

    return { severity: severity, category: category, id: id, priority: priority };
}
