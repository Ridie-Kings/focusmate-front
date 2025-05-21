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
  const { status, setStatus } = useContext(SocketIOContext);

  const [time, setTime] = useState({
    currentTime: DEFAULT_FOCUS_TIME,
    initialTime: DEFAULT_FOCUS_TIME,
  });
  const [isPlay, setIsPlay] = useState(false);
  const [isChronometer, setIsChronometer] = useState(false);
  const [menu, setMenu] = useState<chipsIconType>("enfoque");
  const [cycles, setCycles] = useState<number>(0);
  const [totalCycles, setTotalCycles] = useState<number>(4);
  const [startedElement, setStartedElement] = useState(false);
  const [isType, setIsType] = useState<TimerMode>("pomodoro");

  const timerControls = useTimer({
    status,
    setStatus,
    isPlay: isPlay && !isChronometer,
    setIsPlay,
    time,
    setTime,
    menu,
    setMenu,
    setStartedElement,
    setCycles,
    setTotalCycles,
    cycles,
    totalCycles,
    isChronometer,
  });

  const chronometerControls = useChronometer({
    menu,
    isType,
    time,
    setTime,
    isPlay: isPlay && isChronometer,
    setIsPlay,
    isChronometer,
  });

  const togglePlay = () => {
    if (isChronometer) {
      chronometerControls?.togglePlay();
    } else {
      timerControls?.togglePlay();
    }
  };

  const resetTimer = () => {
    if (isChronometer) {
      chronometerControls?.resetTimer();
    } else {
      timerControls?.resetTimer();
    }
  };

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
    setStartedElement,
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
