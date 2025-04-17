import { Dispatch, SetStateAction } from "react";
import { StatusType } from "../Task/TaskType";

export type ModalContextType = {
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
  item: unknown;
  setItem: (item: unknown) => void;
};

export type tempTaskType = {
  title: string;
  description: string;
  status: StatusType;
  startDate?: Date;
  endDate?: Date;
  dueDate?: Date;
  priority: "high" | "medium" | "low";
  tags: string[];
  color: string;
};
