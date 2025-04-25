import { Dispatch, SetStateAction } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { StatusType } from "@/interfaces/Task/TaskType";

export type ModalContextType = {
  isOpen: { text: string; other?: any };
  setIsOpen: Dispatch<SetStateAction<{ text: string; other?: any }>>;
  profile: ProfileType | null;
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
