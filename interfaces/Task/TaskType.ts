import { Dispatch, DragEvent, SetStateAction } from "react";

export type StatusType =
  | "pending"
  | "progress"
  | "revision"
  | "completed"
  | "dropped";

export type TaskType = {
  color: string;
  userId: string;
  _id: string;
  title: string;
  description: string;
  status: StatusType;
  isDeleted: boolean;
  tags: string[];
  category: string;
  priority: "high" | "medium" | "low";
  subTasks: TaskType[];
  startDate: Date;
  endDate: Date;
  dueDate: Date;
};

export type StatusProps = {
  title: string;
  cards: TaskType[];
  status: StatusType;
  setCards: Dispatch<SetStateAction<TaskType[]>>;
};

export type DropIndicatorProps = {
  beforeId: string | null;
  status: string;
};

export type CardProps = TaskType & {
  handleDragStart: (e: DragEvent<Element>, card: TaskType) => void;
};

export type AddCardProps = {
  status: StatusType;
  setCards: Dispatch<SetStateAction<TaskType[]>>;
};
