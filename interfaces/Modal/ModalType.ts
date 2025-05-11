import { Dispatch, SetStateAction } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { StatusType } from "@/interfaces/Task/TaskType";
import { TypeIsOpen } from "@/components/Provider/ModalProvider";

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
