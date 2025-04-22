"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { timeUtils } from "./TimeUtils";
import { chipsIconType } from "@/components/Reusable/Chips";

export function useChronometer({ menu }: { menu: chipsIconType }) {
  const [time, setTime] = useState<TimeType>({ hours: 0, min: 0, seg: 0 });
  const [isPlay, setIsPlay] = useState(false);

  const totalSecondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const savedTotalSeconds = localStorage.getItem("chronometer_seconds");
      const savedIsPlay = localStorage.getItem("chronometer_isPlay");

      if (savedTotalSeconds) {
        const seconds = parseInt(savedTotalSeconds, 10);

        totalSecondsRef.current = seconds;
        setTime(timeUtils.secondsToTime(seconds));
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
  }, [menu]);

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
        totalSecondsRef.current = seconds;

        try {
          localStorage.setItem("chronometer_seconds", seconds.toString());
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }

        return timeUtils.secondsToTime(seconds);
      });
    },
    [isPlay]
  );

  const togglePlay = useCallback(() => {
    setIsPlay((prev) => {
      const newState = !prev;
      try {
        localStorage.setItem("chronometer_isPlay", newState.toString());
      } catch (error) {
        console.error("Error saving play state to localStorage:", error);
      }
      return newState;
    });
  }, []);

  const resetTimer = useCallback(() => {
    setIsPlay(false);
    setTime({ hours: 0, min: 0, seg: 0 });
    totalSecondsRef.current = 0;

    try {
      localStorage.setItem("chronometer_seconds", "0");
      localStorage.setItem("chronometer_isPlay", "false");
    } catch (error) {
      console.error("Error resetting localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        totalSecondsRef.current += 1;
        const newTime = timeUtils.secondsToTime(totalSecondsRef.current);
        setTime(newTime);

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
    time,
    setTime,
    isPlay,
    setIsPlay,
    togglePlay,
    resetTimer,
    updateTimeManually,
  };
}
