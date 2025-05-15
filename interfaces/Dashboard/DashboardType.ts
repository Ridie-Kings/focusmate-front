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

  setLoadingEvents: Dispatch<SetStateAction<boolean>>;
  setLoadingTask: Dispatch<SetStateAction<boolean>>;
  setLoadingHabits: Dispatch<SetStateAction<boolean>>;
  loadingEvents: boolean;
  loadingTask: boolean;
  loadingHabits: boolean;
};

export type PromiseGetHabitsStats = {
  activeHabits: number;
  bestStreak: number;
  completedToday: number;
  habitsByFrequency: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  totalHabits: number;
};

export type PromiseGetPomodoroStats = {
  completedPomodoros: number;
  totalTimeFormatted: string;
  totalTimeInSeconds: string;
};

export type PromiseGetTasksStats = {
  completedTasks: number;
  pendingTasks: number;
  recentTasks: any;
  tasksByCategory: {};
  tasksByPriority: {
    high: number;
    medium: number;
    low: number;
  };
  totalTasks: number;
};

export type PromiseGetUserActivityStats = {
  lastLogin: Date;
  loginCount: number;
  streak: number;
};

export type PromiseGetMyStats = {
  habits: PromiseGetHabitsStats;
  pomodoro: PromiseGetPomodoroStats;
  tasks: PromiseGetTasksStats;
  userActivity: PromiseGetUserActivityStats;
};
