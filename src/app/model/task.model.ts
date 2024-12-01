export type Task = {
    id: string;
    reporterId: string;
    AssigneeId?: string;
    AssigneeName?: string;
    title: string;
    description: string;
    state: TaskState;
    startDate: Date;
    endDate: Date;
};

export enum TaskState {
    DOING = 'DOING',
    DONE = 'DONE',
    CANCELLED = 'CANCELLED',
    TODO = 'TODO',
}