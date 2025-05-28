import { create } from "zustand";
import { TaskType } from "@/interfaces/Task/TaskType";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { Dispatch, SetStateAction } from "react";

interface DashboardStore {
  events: TaskType[];
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  habits: HabitsType[];
  setHabits: Dispatch<SetStateAction<HabitsType[]>>;
  loadingEvents: boolean;
  setLoadingEvents: Dispatch<SetStateAction<boolean>>;
  loadingTask: boolean;
  setLoadingTask: Dispatch<SetStateAction<boolean>>;
  loadingHabits: boolean;
  setLoadingHabits: Dispatch<SetStateAction<boolean>>;
  userInfo: ProfileType | undefined;
  setUserInfo: Dispatch<SetStateAction<ProfileType | undefined>>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events: events as TaskType[] }),
  tasks: [],
  setTasks: (tasks) => set({ tasks: tasks as TaskType[] }),
  habits: [],
  setHabits: (habits) => set({ habits: habits as HabitsType[] }),
  loadingEvents: true,
  setLoadingEvents: (loading) => set({ loadingEvents: loading as boolean }),
  loadingTask: true,
  setLoadingTask: (loading) => set({ loadingTask: loading as boolean }),
  loadingHabits: true,
  setLoadingHabits: (loading) => set({ loadingHabits: loading as boolean }),
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo: userInfo as ProfileType }),
}));
