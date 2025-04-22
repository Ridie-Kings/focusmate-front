"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { timeUtils } from "./TimeUtils";
import { SocketIOContext } from "../WebsocketProvider";

export function useTimer(
  initialTime: TimeType,
  setInitialTime: Dispatch<SetStateAction<TimeType>>,
  menu: chipsIconType,
  setMenu: (menu: chipsIconType) => void,
  DEFAULT_FOCUS_TIME: TimeType,
  DEFAULT_SHORT_BREAK: TimeType
) {
  const { status, pausePomodoro, resumePomodoro } = useContext(SocketIOContext);

  const [time, setTime] = useState<TimeType>(initialTime);
  const [isPlay, setIsPlay] = useState(false);

  const totalSecondsRef = useRef(timeUtils.timeToSeconds(initialTime));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/ding-ding.mp3");
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
      setInitialTime((prevTime) => {
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
    setTime(initialTime);
    totalSecondsRef.current = timeUtils.timeToSeconds(initialTime);
  }, [initialTime]);

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

            setIsPlay(false);
            if (menu === "concentracion") {
              if (status?.active && status.pomodoroId) pausePomodoro();

              setMenu("D/Corto");
              setTime(DEFAULT_SHORT_BREAK);
            } else if (menu === "D/Corto") {
              if (status?.active && status.pomodoroId) resumePomodoro();
              setMenu("concentracion");
              setTime(DEFAULT_FOCUS_TIME);
            }
            setTimeout(() => {
              setIsPlay(true);
            }, 1000);
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
  }, [isPlay, menu, playEndSound, DEFAULT_FOCUS_TIME, DEFAULT_SHORT_BREAK]);

  return {
    time,
    setTime,
    isPlay,
    togglePlay,
    resetTimer,
    updateTimeManually,
    playEndSound,
  };
}
