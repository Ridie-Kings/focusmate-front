"use client";
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { timeUtils } from "./TimeUtils";
import { ToastContext } from "../ToastProvider";
import TimerUtils from "@/lib/TimerUtils";
import { PomodoroStatus } from "@/interfaces/websocket/WebSocketProvider";

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
  });

  useEffect(() => {
    if (!status) return;

    if (status.state === "working") {
      setIsPlay(true);
      setTime((prev) => ({
        ...prev,
        initialTime: timeUtils.secondsToTime(status.workDuration),
        currentTime: timeUtils.secondsToTime(
          status.startAt.getTime() / 1000 - status.endsAt.getTime() / 1000
        ),
      }));
    } else if (status.state === "idle") {
      setTime((prev) => ({
        ...prev,
        initialTime: timeUtils.secondsToTime(status.workDuration),
        currentTime: timeUtils.secondsToTime(status.workDuration),
      }));
    }

    setStartedElement(true);
  }, [status]);

  useEffect(() => {
    setTotalCycles(status?.cycles ?? 4);
    setCycles(status?.currentCycle ?? 4);
    hasCyclesBeenSetRef.current = status?.currentCycle !== undefined;
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
                currentTime: timeUtils.secondsToTime(status?.workDuration ?? 25),
                initialTime: timeUtils.secondsToTime(status?.workDuration ?? 25),
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
