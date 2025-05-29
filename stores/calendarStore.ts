import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface CalendarStore {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date: date as Date }),
}));
