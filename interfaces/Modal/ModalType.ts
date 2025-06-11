import { Dispatch, SetStateAction } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { StatusType } from "@/interfaces/Task/TaskType";

export type TypeIsOpen = {
  text:
    | "task"
    | "habit"
    | "event"
    | "contact"
    | "pomodoroSettings"
    | "taskKanban"
    | "delete-account"
    | "";
  other?: any;
};
export type ModalContextType = {
  isOpen: TypeIsOpen;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  profile: ProfileType | null;
};

export type tempTaskType = {
  _id: string | undefined;
  title: string;
  description: string;
  status: StatusType;
  startDate?: Date;
  endDate?: Date;
  dueDate?: Date;
  priority: "high" | "medium" | "low";
  color: string;
};

export type tempEventType = {
  _id: string | undefined;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  category: string;
  color: string;
  recurrence: {
    frequency: "none" | "daily" | "weekly" | "monthly";
    interval: number;
    daysOfWeek: number[];
    endDate: Date;
    maxOccurrences: number;
  };
};
