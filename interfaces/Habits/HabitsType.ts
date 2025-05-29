import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { Dispatch, SetStateAction } from "react";

export type HabitsType = {
  _id: string;
  bestStreak: number;
  completedDates: Date[];
  createdAt: Date;
  description: string;
  frequency: "daily" | "weekly" | "monthly";
  lastCompletedDate: Date | undefined;
  name: string;
  status: boolean;
  type: string;
  time?: string;
  streak: number;
  userId: string;
};

export type Frequency = "daily" | "weekly" | "monthly" | "";
export type HabitFormData = {
  _id: string | undefined;
  name: string;
  description: string;
  frequency: Frequency;
  type: string;
  time?: Date;
};

export type HabitOption = {
  label: string;
  value: string;
};

export type ModalHabitProps = {
  prevHabit: HabitsType;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
};

export const HABIT_TYPES = {
  DRINK: "drink",
  STUDY: "study",
  FOOD: "food",
  SLEEP: "sleep",
  SPORT: "sport",
  WORK: "work",
};
