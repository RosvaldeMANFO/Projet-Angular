import { Comment } from "./comment.model";

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
  commentCount?: number;
  startDate: Date;
  endDate: Date;
  comments?: Comment[];
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

export type Period = {
  startDate: Date;
  endDate: Date;
};

// key can be state or category.name
export type TasksByKey = {
  [key: string]: { count: number; color: string; createdAt: Date };
};

// getStaColor
export function getStateColor(state: TaskState): string {
  switch (state) {
    case TaskState.DOING:
      return "#FFEE99";
    case TaskState.DONE:
      return "#36A2EB";
    case TaskState.CANCELLED:
      return "#FF6384";
    case TaskState.TODO:
      return "#FFCE56";

    default:
      return "#3669EBFF";
  }
}
 