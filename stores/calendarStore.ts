import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface CalendarStore {
  date: Date | undefined;
  actions: {
    setDate: Dispatch<SetStateAction<Date | undefined>>;
  };
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  date: new Date(),
  actions: {
    setDate: (date) => set({ date: date as Date }),
  },
}));

export const useDate = () => useCalendarStore((state) => state.date);
