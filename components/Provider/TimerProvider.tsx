"use client";
import { createContext, useContext, useState } from "react";
import { TimerContextType, TimerMode } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "../Reusable/Chips";
import { useTimer } from "./TimerProvider/TimerLogic";
import { useChronometer } from "./TimerProvider/ChronometerLogic";
import { SocketIOContext } from "./WebsocketProvider";
import {
  DEFAULT_FOCUS_TIME,
  defaultContextValue,
} from "@/lib/TimerProviderUtils";

export const TimerContext =
  createContext<TimerContextType>(defaultContextValue);

export default function TimerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useContext(SocketIOContext);

  const [time, setTime] = useState({
    currentTime: DEFAULT_FOCUS_TIME,
    initialTime: DEFAULT_FOCUS_TIME,
  });
  const [isPlay, setIsPlay] = useState(false);
  const [isChronometer, setIsChronometer] = useState(false);
  const [menu, setMenu] = useState<chipsIconType>("enfoque");
  const [cycles, setCycles] = useState<number | undefined>(undefined);
  const [totalCycles, setTotalCycles] = useState<number | undefined>(undefined);
  const [startedElement, setStartedElement] = useState(false);
  const [isType, setIsType] = useState<TimerMode>("pomodoro");

  const chronometerControls = useChronometer({
    menu,
    isType,
    time,
    setTime,
    isPlay,
    setIsPlay,
  });

  const timerControls = useTimer({
    status,
    isPlay,
    setIsPlay,
    time,
    setTime,
    menu,
    setMenu,
    setStartedElement,
    setCycles,
    setTotalCycles,
    cycles: cycles ?? 0,
    totalCycles,
  });

  const { togglePlay, resetTimer } = isChronometer
    ? chronometerControls
    : timerControls;

  const toggleChronometerMode = (e: boolean) => {
    if (isPlay) return;

    setIsChronometer(e);

    setTime((prev) => ({
      ...prev,
      currentTime: e ? { hours: 0, min: 0, seg: 0 } : prev.initialTime,
    }));
  };

  const contextValue = {
    time,
    setTime,
    isPlay,
    togglePlay,
    resetTimer,
    isChronometer,
    toggleChronometerMode,
    setMenu,
    menu,
    startedElement,
    setIsType,
    isType,
    cycles,
    totalCycles,
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
}