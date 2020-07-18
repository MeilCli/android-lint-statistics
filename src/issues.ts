export interface Issues {
    issues: Issue[];
}

export interface Issue {
    id: string;
    severity: string;
    category: string;
    priority: number;
}
