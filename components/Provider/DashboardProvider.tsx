"use client";
import { DashboardContextType } from "@/interfaces/Dashboard/DashboardType";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { TaskType } from "@/interfaces/Task/TaskType";
import { createContext, useState } from "react";

export const DashboardContext = createContext<DashboardContextType>({
  events: [] as TaskType[],
  setEvents: () => [],
  tasks: [],
  setTasks: () => {},
  habits: [],
  setHabits: () => {},
  setLoadingEvents: () => {},
  setLoadingHabits: () => {},
  setLoadingTask: () => {},
  loadingEvents: false,
  loadingHabits: false,
  loadingTask: false,
  userInfo: {} as ProfileType,
  setUserInfo: () => {},
});

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [events, setEvents] = useState<TaskType[]>([]);
  const [habits, setHabits] = useState<HabitsType[]>([]);
  const [userInfo, setUserInfo] = useState<ProfileType>();

  const [loadingTask, setLoadingTask] = useState<boolean>(true);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [loadingHabits, setLoadingHabits] = useState<boolean>(true);

  const contextValue = {
    events,
    setEvents,
    tasks,
    setTasks,
    habits,
    setHabits,

    setLoadingEvents,
    setLoadingHabits,
    setLoadingTask,
    loadingEvents,
    loadingHabits,
    loadingTask,
    userInfo,
    setUserInfo,
  };
  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}
