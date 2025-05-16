"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { timeUtils } from "./TimeUtils";
import { chipsIconType } from "@/components/Reusable/Chips";
import ChronometerUtils from "@/lib/ChronometerUtils";

export function useChronometer({
  menu,
  isType,
  time,
  setTime,
  setIsPlay,
  isPlay,
  isChronometer,
}: {
  isPlay: boolean;
  setIsPlay: Dispatch<SetStateAction<boolean>>;
  time: {
    currentTime: TimeType;
    initialTime: TimeType;
  };
  setTime: Dispatch<
    SetStateAction<{
      currentTime: TimeType;
      initialTime: TimeType;
    }>
  >;
  menu: chipsIconType;
  isType: "pomodoro" | "cronometro" | "temporizador";
  isChronometer: boolean;
}) {
  const totalSecondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { resetTimer, togglePlay } = ChronometerUtils({
    setIsPlay,
    setTime,
    totalSecondsRef,
  });

  useEffect(() => {
    if (!isChronometer) return;
    try {
      const savedTotalSeconds = localStorage.getItem("chronometer_seconds");
      const savedIsPlay = localStorage.getItem("chronometer_isPlay");

      if (savedTotalSeconds) {
        const seconds = parseInt(savedTotalSeconds, 10);

        totalSecondsRef.current = seconds;
        setTime((prev) => ({
          ...prev,
          currentTime: timeUtils.secondsToTime(seconds),
        }));
      }

      if (savedIsPlay === "true") {
        setIsPlay(true);
      }
    } catch (error) {
      console.error(
        "Error loading chronometer state from localStorage:",
        error
      );
    }
  }, [menu, isType]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "chronometer_seconds",
        totalSecondsRef.current.toString()
      );
      localStorage.setItem("chronometer_isPlay", isPlay.toString());
    } catch (error) {
      console.error("Error saving chronometer state to localStorage:", error);
    }
  }, [time, isPlay]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        totalSecondsRef.current += 1;
        const newTime = timeUtils.secondsToTime(totalSecondsRef.current);
        setTime((prev) => ({ ...prev, currentTime: newTime }));

        try {
          localStorage.setItem(
            "chronometer_seconds",
            totalSecondsRef.current.toString()
          );
        } catch (error) {
          console.error("Error saving to localStorage:", error);
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

  return {
    isPlay,
    setIsPlay,
    togglePlay,
    resetTimer,
  };
}
