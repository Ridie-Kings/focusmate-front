"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { timeUtils } from "./TimeUtils";
import { ToastContext } from "../ToastProvider";

export function useTimer(
  initialTime: TimeType,
  menu: chipsIconType,
  setMenu: (menu: chipsIconType) => void,
  DEFAULT_FOCUS_TIME: TimeType,
  DEFAULT_SHORT_BREAK: TimeType
) {
  const [time, setTime] = useState<TimeType>(initialTime);
  const [isPlay, setIsPlay] = useState(false);
  const { addToast } = useContext(ToastContext);

  const totalSecondsRef = useRef(timeUtils.timeToSeconds(initialTime));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/ding-ding.mp3");
    }
  }, []);

  useEffect(() => {
    if (menu === "enfoque") setTime(DEFAULT_FOCUS_TIME);
    else if (menu === "D/Corto") setTime(DEFAULT_SHORT_BREAK);
    else if (menu === "chrono") setTime({ hours: 0, min: 0, seg: 0 });
    else if (menu === "temp") setTime({ hours: 0, min: 0, seg: 0 });
  }, [menu, DEFAULT_FOCUS_TIME, DEFAULT_SHORT_BREAK]);

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

  const togglePlay = useCallback(() => {
    setIsPlay((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsPlay(false);
    setTime(DEFAULT_FOCUS_TIME);
    totalSecondsRef.current = timeUtils.timeToSeconds(DEFAULT_FOCUS_TIME);
  }, [DEFAULT_FOCUS_TIME]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        if (totalSecondsRef.current > 0) {
          totalSecondsRef.current -= 1;

          if (totalSecondsRef.current <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            playEndSound();

            if (menu === "enfoque") {
              setMenu("D/Corto");
              addToast({
                type: "info",
                message: "¡Tiempo terminado!",
                duration: 5000,
              });
            } else if (menu === "D/Corto") {
              setMenu("enfoque");
              addToast({
                type: "info",
                message: "¡Descanso terminado!",
                duration: 5000,
              });
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
  }, [
    isPlay,
    menu,
    playEndSound,
    DEFAULT_FOCUS_TIME,
    DEFAULT_SHORT_BREAK,
    setMenu,
  ]);

  return {
    time,
    setTime,
    isPlay,
    togglePlay,
    resetTimer,
    playEndSound,
  };
}
