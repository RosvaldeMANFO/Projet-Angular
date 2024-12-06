import { Task, TaskCategory } from "./task.model";
import { User } from "./user.model";

export type EditTaskDialogData = {
    users: User[];
    currentUser: User;
    task?: Task;
    categories: TaskCategory[];
};