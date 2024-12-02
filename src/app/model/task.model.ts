export type Task = {
    id: string;
    reporterId: string;
    AssigneeId?: string;
    AssigneeName?: string;
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
