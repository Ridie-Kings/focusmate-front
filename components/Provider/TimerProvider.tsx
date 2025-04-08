"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { TimerContextType, TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import TimerFullScreen from "../Elements/Timer/TimerFullScreen";
import { startTimer } from "@/services/Timers/startTimer";

export const TimerContext = createContext<TimerContextType>({
  isOpen: false,
  setIsOpen: () => {},
  time: { hours: 0, min: 25, seg: 0 },
  setTime: () => {},
  initialTime: { hours: 0, min: 25, seg: 0 },
  setInitialTime: () => {},
  isPlay: false,
  togglePlay: () => {},
  resetTimer: () => {},
  updateTimeManually: () => {},
});

export default function TimerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<TimeType>({ hours: 0, min: 25, seg: 0 });
  const [initialTime, setInitialTime] = useState<TimeType>({
    hours: 0,
    min: 25,
    seg: 0,
  });
  const [isPlay, setIsPlay] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const totalSecondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const timeToSeconds = (t: TimeType): number =>
    t.hours * 3600 + t.min * 60 + t.seg;
  const secondsToTime = (seconds: number): TimeType => ({
    hours: Math.floor(seconds / 3600),
    min: Math.floor((seconds % 3600) / 60),
    seg: seconds % 60,
  });

  useEffect(() => {
    if (!isPlay) {
      totalSecondsRef.current = timeToSeconds(time);
    }
  }, [time, isPlay]);

  const updateTimeManually = (delta: number, updateType: string) => {
    if (isPlay) return;

    setTime((prevTime) => {
      let seconds = timeToSeconds(prevTime);

      if (updateType === "hours") {
        seconds += delta * 3600;
      } else if (updateType === "min") {
        seconds += delta * 60;
      } else if (updateType === "seg") {
        seconds += delta;
      }

      seconds = Math.max(0, seconds);
      const newTime = secondsToTime(seconds);

      setInitialTime(newTime);

      return newTime;
    });
  };

  const togglePlay = async () => {
    setIsPlay((prev) => !prev);
    // if (isPlay) {
    //   const res = await startTimer({ task: "test task", title: "test title" });
    // } else {
    //   const res = await
    // }
  };

  const resetTimer = () => {
    setIsPlay(false);
    setTime(initialTime);
    totalSecondsRef.current = timeToSeconds(initialTime);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay && totalSecondsRef.current > 0) {
      intervalRef.current = setInterval(() => {
        totalSecondsRef.current -= 1;

        const newTime = secondsToTime(totalSecondsRef.current);

        setTime(newTime);

        if (totalSecondsRef.current <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsPlay(false);
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlay]);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {isOpen && <TimerFullScreen />}
      {children}
    </TimerContext.Provider>
  );
}
