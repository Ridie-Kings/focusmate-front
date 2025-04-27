import { Dispatch, SetStateAction } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { StatusType } from "@/interfaces/Task/TaskType";

export type ModalContextType = {
  isOpen: { text: string; other?: unknown };
  setIsOpen: Dispatch<SetStateAction<{ text: string; other?: unknown }>>;
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
