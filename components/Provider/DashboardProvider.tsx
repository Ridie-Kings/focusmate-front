"use client";
import { DashboardContextType } from "@/interfaces/Dashboard/DashboardType";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { TaskType } from "@/interfaces/Task/TaskType";
import { createContext, useState } from "react";

export const DashboardContext = createContext<DashboardContextType>({
  events: [] as TaskType[],
  setEvents: () => [],
  tasks: [],
  setTasks: () => {},
  habits: [],
  setHabits: () => {},
});

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [events, setEvents] = useState<TaskType[]>([]);
  const [habits, setHabits] = useState<HabitsType[]>([]);

  console.log("tasks", tasks);

  return (
    <DashboardContext.Provider
      value={{ events, setEvents, tasks, setTasks, habits, setHabits }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
