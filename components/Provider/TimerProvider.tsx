"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import TimerFullScreen from "../Elements/Timer/TimerFullScreen";

type TimerContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<SetStateAction<TimeType>>;
  time: TimeType;
};
export const TimerContext = createContext<TimerContextType>({
  isOpen: false,
  setIsOpen: () => {},
  setTime: () => {},
  time: { hours: 0, min: 0, seg: 0 },
});

export default function TimerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({ hours: 0, min: 0, seg: 0 });
  const [isClient, setIsClient] = useState(false);

  const menuTimes = useMemo<Record<string, TimeType>>(
    () => ({
      concentracion: { hours: 0, min: 25, seg: 0 },
      "D/Corto": { hours: 0, min: 5, seg: 0 },
      "D/Largo": { hours: 0, min: 15, seg: 0 },
    }),
    []
  );

  useEffect(() => {
    if (time.hours === 0 && time.min === 0 && time.seg === 0)
      setTime(menuTimes["concentracion"]);
  }, [time.hours, time.min, time.seg, setTime, menuTimes]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    try {
      const storedTime = localStorage.getItem("time");

      if (storedTime && time.hours !== 0 && time.min !== 0 && time.seg !== 0) {
        const parsedTime = JSON.parse(storedTime);
        setTime(parsedTime);
      } else {
        localStorage.setItem("time", JSON.stringify(time));
      }
    } catch (error) {
      console.error("localStorage error:", error);
    }
  }, [time, isClient]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <TimerContext.Provider value={{ isOpen, setIsOpen, setTime, time }}>
      {isOpen && <TimerFullScreen />}
      {children}
    </TimerContext.Provider>
  );
}
