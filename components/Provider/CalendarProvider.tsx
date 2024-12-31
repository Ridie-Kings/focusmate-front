"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type CalendarContextType = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
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
  const [date, setDate] = useState(new Date());
  return (
    <CalendarContext.Provider value={{ date, setDate }}>
      {children}
    </CalendarContext.Provider>
  );
}
