export type Comment = {
    id: string;
    taskId: string;
    authorId: string;
    authorName?: string;
    content: string;
    createdAt: Date;
    taskName?: string;
    replyTo?: string;
};