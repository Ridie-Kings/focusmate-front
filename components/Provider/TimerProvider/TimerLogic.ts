"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { timeUtils } from "./TimeUtils";
import TimerUtils from "@/lib/TimerUtils";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import { differenceInSeconds } from "date-fns";

export function useTimer({
  status,
  setStatus,
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
  status: PomodoroStatusType | null;
  setStatus: Dispatch<SetStateAction<PomodoroStatusType | null>>;
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
  setTotalCycles: Dispatch<SetStateAction<number>>;
  setCycles: Dispatch<SetStateAction<number>>;
  cycles: number;
  totalCycles: number;
  isChronometer: boolean;
}) {
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
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/ding-ding.mp3");
    }
  }, [isPlay]);

  useEffect(() => {
    if (!status || isChronometer) return;

    if (
      status.state === "working" ||
      status.state === "shortBreak" ||
      status.state === "longBreak"
    ) {
      setTime((prev) => {
        try {
          // if (!status.startAt || !status.endAt) {
          //   console.error("Missing startAt or endAt timestamps");
          //   return prev;
          // }

          const startDate = new Date(status.startAt);
          const endDate = new Date(status.endAt);

          // if (
          //   status.pausedState !== "paused" ||
          //   startDate.toString() === "Invalid Date" ||
          //   endDate.toString() === "Invalid Date"
          // ) {
          //   console.error("Invalid date format for startAt or endAt");
          //   return prev;
          // }

          const timeInSeconds =
            status.remainingTime !== null
              ? status.remainingTime
              : status.pausedState === "paused"
              ? differenceInSeconds(endDate, startDate)
              : differenceInSeconds(endDate, new Date());

          console.log(
            "endDate, new Date()",
            differenceInSeconds(endDate, new Date()) + 1
          );
          console.log(
            "endDate, startDate",
            differenceInSeconds(endDate, startDate)
          );
          console.log("status.remainingTime", status.remainingTime);
          console.log("timeInSeconds", timeInSeconds);

          return {
            ...prev,
            initialTime: timeUtils.secondsToTime(status.workDuration),
            currentTime: timeUtils.secondsToTime(timeInSeconds),
          };
        } catch (error) {
          console.error("Error calculating timer value:", error);
          return prev;
        }
      });

      if (status.state === "working") setMenu("enfoque");
      if (status.state === "shortBreak") setMenu("D/Corto");
      if (status.state === "longBreak") setMenu("D/Largo");

      if (status?.pausedState === "paused") setIsPlay(false);
      else if (!isPlay && status.pausedState !== "paused") setIsPlay(true);
    } else if (status.state === "idle" || status.state === "finished") {
      setMenu("enfoque");
      setIsPlay(false);
      setTime((prev) => ({
        ...prev,
        initialTime: timeUtils.secondsToTime(status.workDuration),
        currentTime: timeUtils.secondsToTime(status.workDuration),
      }));
      setStartedElement(false);
    }

    if (status.state !== "idle" && status.state !== "finished")
      setStartedElement(true);
  }, [
    status,
    isPlay,
    setIsPlay,
    setMenu,
    setStartedElement,
    setTime,
    setStatus,
    isChronometer,
  ]);

  useEffect(() => {
    if (status) {
      setTotalCycles(status.cycles ?? 4);
      setCycles(status.currentCycle ?? 0);
      hasCyclesBeenSetRef.current = status.currentCycle !== undefined;
    }
  }, [status, setCycles, setTotalCycles]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlay) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const currentSeconds = timeUtils.timeToSeconds(prev.currentTime);

          console.log(currentSeconds);
          if (currentSeconds <= 1) {
            console.log("playEndSound");

            playEndSound();
            clearInterval(intervalRef.current as NodeJS.Timeout);
            intervalRef.current = null;
            return prev;
          }

          return {
            ...prev,
            currentTime: timeUtils.secondsToTime(currentSeconds - 1),
          };
        });
      }, 1000);
    }

    if (status?.state === "completed" || status?.state === "finished") {
      resetTimer();
      setStatus(null);
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
    setMenu,
    cycles,
    totalCycles,
    resetTimer,
    setTime,
  ]);

  return {
    togglePlay,
    resetTimer,
    playEndSound,
  };
}
