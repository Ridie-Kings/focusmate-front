import { Dispatch, SetStateAction } from "react";
import { StatusType } from "../Task/TaskType";

export type CalendarContextType = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};

export type CategoriesProps = {
  items?: string[];
};

export type PromiseCalendar = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: StatusType;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
  isDeleted: boolean;
  tags: string[];
  priority: "high" | "medium" | "low";
  category: string;
  subTasks: [];
  color: string;
  createdAt: string;
  updatedAt: string;
}[];

export type NavTypeType = "Día" | "Semana" | "Mes";
