import { Dispatch, SetStateAction } from "react";
import { TaskType } from "../Task/TaskType";
import { HabitsType } from "../Habits/HabitsType";

export type DashboardContextType = {
  events: TaskType[];
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  habits: HabitsType[];
  setHabits: Dispatch<SetStateAction<HabitsType[]>>;
};
