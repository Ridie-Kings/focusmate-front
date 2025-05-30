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
  setEvents: (newEvents) => {
    set((state) => ({
      events:
        typeof newEvents === "function" ? newEvents(state.events) : newEvents,
    }));
  },
  tasks: [],
  setTasks: (newTasks) =>
    set((state) => ({
      tasks: typeof newTasks === "function" ? newTasks(state.tasks) : newTasks,
    })),
  habits: [],
  setHabits: (newHabits) =>
    set((state) => ({
      habits:
        typeof newHabits === "function" ? newHabits(state.habits) : newHabits,
    })),
  loadingEvents: true,
  setLoadingEvents: (newLoadingEvents) =>
    set((state) => ({
      loadingEvents:
        typeof newLoadingEvents === "function"
          ? newLoadingEvents(state.loadingEvents)
          : newLoadingEvents,
    })),
  loadingTask: true,
  setLoadingTask: (newLoadingTask) =>
    set((state) => ({
      loadingTask:
        typeof newLoadingTask === "function"
          ? newLoadingTask(state.loadingTask)
          : newLoadingTask,
    })),
  loadingHabits: true,
  setLoadingHabits: (newLoadingHabits) =>
    set((state) => ({
      loadingHabits:
        typeof newLoadingHabits === "function"
          ? newLoadingHabits(state.loadingHabits)
          : newLoadingHabits,
    })),
  userInfo: undefined,
  setUserInfo: (newUserInfo) =>
    set((state) => ({
      userInfo:
        typeof newUserInfo === "function"
          ? newUserInfo(state.userInfo)
          : newUserInfo,
    })),
}));
