"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type CalendarContextType = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};
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
