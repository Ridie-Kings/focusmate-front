"use client";
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { timeUtils } from "./TimeUtils";
import { ToastContext } from "../ToastProvider";
import TimerUtils from "@/lib/TimerUtils";
import { PomodoroStatus } from "@/interfaces/websocket/WebSocketProvider";
import { differenceInSeconds } from "date-fns";

export function useTimer({
  status,
  isPlay,
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
}: {
  status: PomodoroStatus | null;
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
  setMenu: (menu: chipsIconType) => void;
  setStartedElement: Dispatch<SetStateAction<boolean>>;
  setTotalCycles: Dispatch<SetStateAction<number | undefined>>;
  setCycles: Dispatch<SetStateAction<number | undefined>>;
  cycles: number | undefined;
  totalCycles: number | undefined;
  isChronometer: boolean;
}) {
  const { addToast } = useContext(ToastContext);

  const totalSecondsRef = useRef(timeUtils.timeToSeconds(time.initialTime));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasCyclesBeenSetRef = useRef(false);

  const { resetTimer, togglePlay, playEndSound } = TimerUtils({
    audioRef,
    setIsPlay,
    setTime,
    totalSecondsRef,
    setMenu,
    status,
    setCycles,
    totalCycles,
    setStartedElement,
  });

  useEffect(() => {
    if (!status || isChronometer) return;

    if (status.state === "working") {
      setTime((prev) => {
        try {
          if (!status.startAt || !status.endAt) {
            console.error("Missing startAt or endAt timestamps");
            return prev;
          }

          const startDate = new Date(status.startAt);
          const endDate = new Date(status.endAt);

          if (
            startDate.toString() === "Invalid Date" ||
            endDate.toString() === "Invalid Date"
          ) {
            console.error("Invalid date format for startAt or endAt");
            return prev;
          }

          const timeInSeconds =
            status.remainingTime !== null
              ? status.remainingTime
              : status.state !== "idle"
              ? differenceInSeconds(endDate, new Date())
              : differenceInSeconds(endDate, startDate);

          const positiveTimeInSeconds = Math.max(0, timeInSeconds);

          return {
            ...prev,
            initialTime: timeUtils.secondsToTime(status.workDuration),
            currentTime: timeUtils.secondsToTime(positiveTimeInSeconds),
          };
        } catch (error) {
          console.error("Error calculating timer value:", error);
          return prev;
        }
      });

      if (!isPlay && status.pausedState !== "paused") setIsPlay(true);
    } else if (status.state === "idle") {
      setTime((prev) => ({
        ...prev,
        initialTime: timeUtils.secondsToTime(status.workDuration),
        currentTime: timeUtils.secondsToTime(status.workDuration),
      }));
    }

    setStartedElement(true);
  }, [status, isPlay]);

  useEffect(() => {
    setTotalCycles(status?.cycles ?? 4);
    setCycles(status?.currentCycle ?? 4);
    hasCyclesBeenSetRef.current = status?.currentCycle !== undefined;
    if (status?.pausedState === "paused") setIsPlay(false);
  }, [status]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/ding-ding.mp3");
    }
  }, []);

  useEffect(() => {
    if (!isPlay) {
      totalSecondsRef.current = timeUtils.timeToSeconds(time.currentTime);
    }
  }, [time, isPlay]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        if (totalSecondsRef.current > 0) {
          totalSecondsRef.current -= 1;
          setTime((prev) => ({
            ...prev,
            currentTime: timeUtils.secondsToTime(
              timeUtils.timeToSeconds(prev.currentTime) - 1
            ),
          }));

          if (totalSecondsRef.current <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            playEndSound();

            if (menu === "enfoque") {
              setMenu("D/Corto");
              setTime((prev) => ({
                ...prev,
                currentTime: timeUtils.secondsToTime(status?.shortBreak ?? 15),
                initialTime: timeUtils.secondsToTime(status?.shortBreak ?? 15),
              }));
              totalSecondsRef.current = status?.shortBreak ?? 15;
              addToast({
                type: "info",
                message: "¡Tiempo terminado!",
                duration: 5000,
              });
            } else if (menu === "D/Corto") {
              setMenu("enfoque");
              setTime((prev) => ({
                ...prev,
                currentTime: timeUtils.secondsToTime(
                  status?.workDuration ?? 25
                ),
                initialTime: timeUtils.secondsToTime(
                  status?.workDuration ?? 25
                ),
              }));
              totalSecondsRef.current = status?.workDuration ?? 25;
              setCycles((prev) => {
                return prev !== undefined && prev > 0 ? prev - 1 : prev;
              });
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

    if (hasCyclesBeenSetRef.current && cycles === 0) {
      resetTimer();
      return;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlay, menu, playEndSound, setMenu, cycles]);

  return {
    togglePlay,
    resetTimer,
    playEndSound,
  };
}
