export type StatusType =
  | "pending"
  | "progress"
  | "revision"
  | "completed"
  | "dropped";

export type TaskType = {
  userId: string;
  _id: string;
  title: string;
  description: string;
  status: StatusType;
  priority: "high" | "medium" | "low";
  isDeleted: boolean;
  tags: string[];
  category: string;
  subTasks: TaskType[];
  dueDate: Date;
};
