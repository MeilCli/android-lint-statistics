export interface XmlIssuesRoot {
    issues: XmlIssues;
}

export interface XmlIssues {
    issue: XmlIssueRoot[];
}

export interface XmlIssueRoot {
    $: XmlIssue;
}

export interface XmlIssue {
    id: string;
    severity: string;
    category: string;
    priority: string;
}
