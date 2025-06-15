"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { timeUtils } from "./TimeUtils";
import TimerUtils from "@/lib/TimerUtils";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";

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
          const timeInSeconds =
            status.currentTime !== 0
              ? status.currentTime
              : status.remainingTime;

          return {
            ...prev,
            initialTime: timeUtils.secondsToTime(
              status.state === "working"
                ? status.workDuration
                : status.state === "shortBreak"
                ? status.shortBreak
                : status.longBreak
            ),
            currentTime: timeUtils.secondsToTime(timeInSeconds),
          };
        } catch (error) {
          console.error("Error calculating timer value:", error);
          return prev;
        }
      });

      if (status.state === "working") setMenu("focus");
      if (status.state === "shortBreak") setMenu("break");
      if (status.state === "longBreak") setMenu("longBreak");

      if (status?.pausedState === "paused") setIsPlay(false);
      else if (!isPlay && status.pausedState !== "paused") setIsPlay(true);
    } else if (status.state === "idle") {
      setMenu("focus");
      setIsPlay(false);
      setTime((prev) => ({
        ...prev,
        initialTime: timeUtils.secondsToTime(status.workDuration),
        currentTime: timeUtils.secondsToTime(status.workDuration),
      }));
      setStartedElement(false);
    }

    if (
      status.state !== "idle" &&
      status.state !== "finished" &&
      status.state !== "completed"
    )
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
      const startTime = Date.now();
      const initialSeconds = timeUtils.timeToSeconds(time.currentTime);

      intervalRef.current = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const currentSeconds = initialSeconds - elapsedSeconds;

        if (currentSeconds <= 2) {
          playEndSound();
        }
        if (currentSeconds <= 1) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          intervalRef.current = null;
          return;
        }

        if (typeof document !== "undefined") {
          document.title = `SherpApp | ${timeUtils
            .secondsToTime(currentSeconds)
            .hours.toString()
            .padStart(2, "0")}:${timeUtils
            .secondsToTime(currentSeconds)
            .min.toString()
            .padStart(2, "0")}:${timeUtils
            .secondsToTime(currentSeconds)
            .seg.toString()
            .padStart(2, "0")}`;
        }

        setTime((prev) => ({
          ...prev,
          currentTime: timeUtils.secondsToTime(currentSeconds),
        }));
      }, 100);
    }

    if (status?.state === "completed" || status?.state === "finished") {
      resetTimer();
      setTime((prev) => ({
        ...prev,
        initialTime: timeUtils.secondsToTime(1500),
        currentTime: timeUtils.secondsToTime(1500),
      }));
      setCycles(0);
      setTotalCycles(4);
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
