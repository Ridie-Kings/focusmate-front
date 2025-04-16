"use client";
import { createContext, useEffect, useRef, useState, useCallback } from "react";
import { TimerContextType, TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import TimerFullScreen from "../Elements/Timer/TimerFullScreen";
import { chipsIconType } from "../Reusable/Chips";

const DEFAULT_FOCUS_TIME = { hours: 0, min: 25, seg: 0 };
const DEFAULT_SHORT_BREAK = { hours: 0, min: 5, seg: 0 };
const INITIAL_TIMER_STATE = { hours: 0, min: 0, seg: 5 };

const timeUtils = {
  timeToSeconds: (t: TimeType): number => t.hours * 3600 + t.min * 60 + t.seg,
  secondsToTime: (seconds: number): TimeType => ({
    hours: Math.floor(seconds / 3600),
    min: Math.floor((seconds % 3600) / 60),
    seg: seconds % 60,
  }),
};

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
  const [time, setTime] = useState<TimeType>(INITIAL_TIMER_STATE);
  const [initialTime, setInitialTime] = useState<TimeType>(DEFAULT_FOCUS_TIME);
  const [isPlay, setIsPlay] = useState(false);
  const [isChronometer, setIsChronometer] = useState(false);
  const [menu, setMenu] = useState<chipsIconType>("concentracion");
  const [isClient, setIsClient] = useState(false);

  const totalSecondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/ding-ding.mp3");

      try {
        const savedTime = localStorage.getItem("initialTime");
        if (savedTime) {
          setInitialTime(JSON.parse(savedTime));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du temps initial:",
          error
        );
      }
    }
  }, []);

  const playEndSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Error:", err);
      });
    }
  }, []);

  useEffect(() => {
    if (!isPlay) {
      totalSecondsRef.current = timeUtils.timeToSeconds(time);
    }
  }, [time, isPlay]);

  useEffect(() => {
    if (!isClient) return;

    try {
      localStorage.setItem("initialTime", JSON.stringify(initialTime));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du temps initial:", error);
    }
  }, [initialTime, isClient]);

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

  const toggleChronometerMode = useCallback(
    (e: boolean) => {
      if (isPlay) return;

      setIsChronometer(e);

      if (e) {
        totalSecondsRef.current = 0;
        setTime({ hours: 0, min: 0, seg: 0 });
      } else {
        totalSecondsRef.current = timeUtils.timeToSeconds(initialTime);
        setTime(initialTime);
      }
    },
    [isPlay, initialTime]
  );

  const updateTimeManually = useCallback(
    (delta: number, updateType: string) => {
      if (isPlay) return;

      setTime((prevTime) => {
        let seconds = timeUtils.timeToSeconds(prevTime);

        if (updateType === "hours") {
          seconds += delta * 3600;
        } else if (updateType === "min") {
          seconds += delta * 60;
        } else if (updateType === "seg") {
          seconds += delta;
        }

        seconds = Math.max(0, seconds);
        const newTime = timeUtils.secondsToTime(seconds);

        if (!isChronometer) {
          setInitialTime(newTime);
        }

        return newTime;
      });
    },
    [isPlay, isChronometer]
  );

  const togglePlay = useCallback(() => {
    setIsPlay((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsPlay(false);

    if (isChronometer) {
      setTime({ hours: 0, min: 0, seg: 0 });
      totalSecondsRef.current = 0;
    } else {
      setTime(initialTime);
      totalSecondsRef.current = timeUtils.timeToSeconds(initialTime);
    }
  }, [isChronometer, initialTime]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        if (isChronometer) {
          totalSecondsRef.current += 1;
          setTime(timeUtils.secondsToTime(totalSecondsRef.current));
        } else {
          if (totalSecondsRef.current > 0) {
            totalSecondsRef.current -= 1;
            setTime(timeUtils.secondsToTime(totalSecondsRef.current));

            if (totalSecondsRef.current <= 0) {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }

              playEndSound();

              setIsPlay(false);
              if (menu === "concentracion") {
                setMenu("D/Corto");
                setInitialTime(DEFAULT_SHORT_BREAK);
                setTime(DEFAULT_SHORT_BREAK);
              } else if (menu === "D/Corto") {
                setMenu("concentracion");
                setInitialTime(DEFAULT_FOCUS_TIME);
                setTime(DEFAULT_FOCUS_TIME);
              }
              setTimeout(() => {
                setIsPlay(true);
              }, 1000);
            }
          }
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlay, isChronometer, menu, playEndSound]);

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
