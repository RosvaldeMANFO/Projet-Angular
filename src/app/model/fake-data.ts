import { Task, TaskCategory, TaskState } from "./task.model";
import { User } from "./user.model";

export const fakeUsers: User[] = [
  {
    id: "U001",
    name: "Alice Johnson",
    password: "password123",
    email: "alice.johnson@example.com",
  },
  {
    id: "U002",
    name: "Bob Smith",
    password: "securePass456",
    email: "bob.smith@example.com",
  },
  {
    id: "U003",
    name: "Charlie Taylor",
    password: "charlie789",
    email: "charlie.taylor@example.com",
  },
  {
    id: "U004",
    name: "Diana Green",
    password: "diana2024",
    email: "diana.green@example.com",
  },
  {
    id: "U005",
    name: "Emma Davis",
    password: "emma@321",
    email: "emma.davis@example.com",
  },
  {
    id: "U006",
    name: "Frank Wilson",
    password: "frank!999",
    email: "frank.wilson@example.com",
  },
  {
    id: "U007",
    name: "Grace White",
    password: "grace#abc",
    email: "grace.white@example.com",
  },
  {
    id: "U008",
    name: "Henry Moore",
    password: "henry2000",
    email: "henry.moore@example.com",
  },
  {
    id: "U009",
    name: "Ivy Brown",
    password: "ivy-secure",
    email: "ivy.brown@example.com",
  },
  {
    id: "U010",
    name: "Jack Clark",
    password: "jack@777",
    email: "jack.clark@example.com",
  },
];

export const fakeTaskCategories: TaskCategory[] = [
  { name: "Bug", color: "#FF0000" },
  { name: "Feature", color: "#008000" },
  { name: "Improvement", color: "#0000FF" },
  { name: "Documentation", color: "#FFA500" },
  { name: "Testing", color: "#800080" },
  { name: "Research", color: "#00CED1" },
  { name: "Design", color: "#FFC0CB" },
  { name: "Deployment", color: "#A52A2A" },
  { name: "Maintenance", color: "#708090" },
  { name: "Support", color: "#FFD700" },
];

export const fakeTasks: Task[] = [
  {
    id: "1",
    reporterName: "Alice Johnson",
    reporterId: "U001",
    assigneeId: "U002",
    assigneeName: "Bob Smith",
    title: "Fix login bug",
    description:
      "Resolve the issue causing login failures for users with special characters in passwords.",
    state: TaskState.DOING,
    category: fakeTaskCategories[0], // BUG
    startDate: new Date("2024-11-20"),
    endDate: new Date("2024-11-30"),
  },
  {
    id: "2",
    reporterName: "Charlie Taylor",
    reporterId: "U003",
    assigneeId: "U004",
    assigneeName: "Diana Green",
    title: "Implement dark mode",
    description: "Add support for a dark theme throughout the application.",
    state: TaskState.TODO,
    category: fakeTaskCategories[1], // FEATURE
    startDate: new Date("2024-11-25"),
    endDate: new Date("2024-12-10"),
  },
  {
    id: "3",
    reporterName: "Emma Davis",
    reporterId: "U005",
    title: "Optimize database queries",
    description: "Refactor and optimize slow-performing SQL queries.",
    state: TaskState.DONE,
    category: fakeTaskCategories[2], // IMPROVEMENT
    startDate: new Date("2024-10-15"),
    endDate: new Date("2024-10-30"),
  },
  {
    id: "4",
    reporterName: "Frank Wilson",
    reporterId: "U006",
    assigneeId: "U007",
    assigneeName: "Grace White",
    title: "Add password reset functionality",
    description:
      "Enable users to reset their passwords via email verification.",
    state: TaskState.CANCELLED,
    category: fakeTaskCategories[3], // FEATURE
    startDate: new Date("2024-09-10"),
    endDate: new Date("2024-09-20"),
  },
  {
    id: "5",
    reporterName: "Hannah Lee",
    reporterId: "U001",
    assigneeId: "U009",
    assigneeName: "Ivy Brown",
    title: "Fix notification bug",
    description:
      "Resolve issues where push notifications are sent multiple times.",
    state: TaskState.TODO,
    category: fakeTaskCategories[4], // BUG
    startDate: new Date("2024-12-01"),
    endDate: new Date("2024-12-15"),
  },
];
