export type Task = {
    id: string;
    reporterName: String;
    reporterId: string;
    assigneeId?: string;
    assigneeName?: string;
    title: string;
    description: string;
    state: TaskState;
    category: TaskCategory;
    startDate: Date;
    endDate: Date;
};

export enum TaskState {
    DOING = "DOING",
    DONE = "DONE",
    CANCELLED = "CANCELLED",
    TODO = "TODO",
}

export enum TaskCategory {
    BUG = "BUG",
    FEATURE = "FEATURE",
    IMPROVEMENT = "IMPROVEMENT",
}
