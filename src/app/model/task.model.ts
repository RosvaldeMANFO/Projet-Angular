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
    createdAt: Date;
};

export enum TaskState {
    DOING = "DOING",
    DONE = "DONE",
    CANCELLED = "CANCELLED",
    TODO = "TODO",
}

export type TaskCategory = {
  id?: string;
  name: string;
  color: string;
};