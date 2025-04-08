"use client";
import { CalendarContextType } from "@/interfaces/Calendar/CalendarType";
import { createContext, useState } from "react";

export const CalendarContext = createContext<CalendarContextType>({
  date: new Date(),
  setDate: () => {},
});

export default function CalendarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <CalendarContext.Provider value={{ date, setDate }}>
      {children}
    </CalendarContext.Provider>
  );
}
