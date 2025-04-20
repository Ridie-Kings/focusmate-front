"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { timeUtils } from "./TimeUtils";

export function useChronometer() {
  const [time, setTime] = useState<TimeType>({ hours: 0, min: 0, seg: 0 });
  const [isPlay, setIsPlay] = useState(false);

  const totalSecondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlay) {
      totalSecondsRef.current = timeUtils.timeToSeconds(time);
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
        return timeUtils.secondsToTime(seconds);
      });
    },
    [isPlay]
  );

  const togglePlay = useCallback(() => {
    setIsPlay((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsPlay(false);
    setTime({ hours: 0, min: 0, seg: 0 });
    totalSecondsRef.current = 0;
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        totalSecondsRef.current += 1;
        setTime(timeUtils.secondsToTime(totalSecondsRef.current));
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
