"use client";
import { createContext, useEffect, useState } from "react";
import { TimerContextType, TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import TimerFullScreen from "../Elements/Timer/TimerFullScreen";
import { chipsIconType } from "../Reusable/Chips";
import { useTimer } from "./TimerProvider/TimerLogic";
import { useChronometer } from "./TimerProvider/ChronometerLogic";

const DEFAULT_FOCUS_TIME = { hours: 0, min: 25, seg: 0 };
const DEFAULT_SHORT_BREAK = { hours: 0, min: 5, seg: 0 };
const INITIAL_TIMER_STATE = { hours: 0, min: 25, seg: 0 };

const defaultContextValue: TimerContextType = {
  isOpen: false,
  setIsOpen: () => {},
  time: INITIAL_TIMER_STATE,
  setTime: () => {},
  initialTime: DEFAULT_FOCUS_TIME,
  setInitialTime: () => {},
  isPlay: false,
  togglePlay: () => {},
  resetTimer: () => {},
  updateTimeManually: () => {},
  isChronometer: false,
  toggleChronometerMode: () => {},
  setMenu: () => {},
  menu: "concentracion",
};

export const TimerContext =
  createContext<TimerContextType>(defaultContextValue);

export default function TimerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialTime, setInitialTime] = useState<TimeType>(DEFAULT_FOCUS_TIME);
  const [isChronometer, setIsChronometer] = useState(false);
  const [menu, setMenu] = useState<chipsIconType>("concentracion");

  const {
    time: timerTime,
    setTime: setTimerTime,
    isPlay: timerIsPlay,
    togglePlay: timerTogglePlay,
    resetTimer: timerReset,
    updateTimeManually: timerUpdateManually,
  } = useTimer(
    initialTime,
    setInitialTime,
    menu,
    setMenu,
    DEFAULT_FOCUS_TIME,
    DEFAULT_SHORT_BREAK
  );

  const {
    time: chronometerTime,
    setTime: setChronometerTime,
    isPlay: chronometerIsPlay,
    togglePlay: chronometerTogglePlay,
    resetTimer: chronometerReset,
    updateTimeManually: chronometerUpdateManually,
  } = useChronometer({ menu });

  const time = isChronometer ? chronometerTime : timerTime;
  const setTime = isChronometer ? setChronometerTime : setTimerTime;
  const isPlay = isChronometer ? chronometerIsPlay : timerIsPlay;
  const togglePlay = isChronometer ? chronometerTogglePlay : timerTogglePlay;
  const resetTimer = isChronometer ? chronometerReset : timerReset;
  const updateTimeManually = isChronometer
    ? chronometerUpdateManually
    : timerUpdateManually;

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

  const toggleChronometerMode = (e: boolean) => {
    if (isPlay) return;

    setIsChronometer(e);

    if (e) {
      setChronometerTime({ hours: 0, min: 0, seg: 0 });
    } else {
      setTimerTime(initialTime);
    }
  };

  const contextValue = {
    isOpen,
    setIsOpen,
    time,
    setTime,
    initialTime,
    setInitialTime,
    isPlay,
    togglePlay,
    resetTimer,
    updateTimeManually,
    isChronometer,
    toggleChronometerMode,
    setMenu,
    menu,
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {isOpen && <TimerFullScreen />}
      {children}
    </TimerContext.Provider>
  );
}
