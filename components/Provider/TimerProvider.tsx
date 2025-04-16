"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { TimerContextType, TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import TimerFullScreen from "../Elements/Timer/TimerFullScreen";

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
  isChronometer: false,
  toggleChronometerMode: () => {},
});

export default function TimerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<TimeType>({ hours: 0, min: 0, seg: 10 });
  const [initialTime, setInitialTime] = useState<TimeType>({
    hours: 0,
    min: 25,
    seg: 0,
  });
  const [isPlay, setIsPlay] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isChronometer, setIsChronometer] = useState(false);

  const totalSecondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/ding-ding.mp3");
    }
  }, []);

  const playEndSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Erreur lors de la lecture du son:", err);
      });
    }
  };

  const toggleChronometerMode = (e: boolean) => {
    if (isPlay) return;
    console.log(e);

    setIsChronometer((prev) => e);

    if (!isChronometer) {
      totalSecondsRef.current = 0;
    } else {
      totalSecondsRef.current = timeToSeconds(initialTime);
    }
  };

  console.log(isChronometer);

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

      if (!isChronometer) {
        setInitialTime(newTime);
      }

      return newTime;
    });
  };

  const togglePlay = async () => {
    setIsPlay((prev) => !prev);
  };

  const resetTimer = () => {
    setIsPlay(false);

    if (isChronometer) {
      setTime({ hours: 0, min: 0, seg: 0 });
      totalSecondsRef.current = 0;
    } else {
      setTime(initialTime);
      totalSecondsRef.current = timeToSeconds(initialTime);
    }
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        if (isChronometer) {
          totalSecondsRef.current += 1;
          const newTime = secondsToTime(totalSecondsRef.current);
          setTime(newTime);
        } else {
          if (totalSecondsRef.current > 0) {
            totalSecondsRef.current -= 1;
            const newTime = secondsToTime(totalSecondsRef.current);
            setTime(newTime);

            if (totalSecondsRef.current <= 0) {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              setIsPlay(false);
              playEndSound();
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
  }, [isPlay, isChronometer]);

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
    isChronometer,
    toggleChronometerMode,
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {isOpen && <TimerFullScreen />}
      {children}
    </TimerContext.Provider>
  );
}
