import { Dispatch, RefObject, SetStateAction, useCallback } from "react";
import { timeUtils } from "@/components/Provider/TimerProvider/TimeUtils";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import { useTimerStore } from "@/stores/timerStore";

export default function TimerUtils({
  audioRef,
  setIsPlay,
  setTime,
  totalSecondsRef,
  setMenu,
  status,
  totalCycles,
  setCycles,
  setStartedElement,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setIsPlay: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<
    SetStateAction<{
      currentTime: TimeType;
      initialTime: TimeType;
    }>
  >;
  totalSecondsRef: RefObject<number>;
  setMenu: (menu: chipsIconType) => void;
  status: PomodoroStatusType | null;
  totalCycles: number;
  setCycles: Dispatch<SetStateAction<number>>;
  setStartedElement: Dispatch<SetStateAction<boolean>>;
}) {
  const { resetTimer: resetTimerStore } = useTimerStore();

  const playEndSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const preloadSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  const togglePlay = useCallback(() => {
    preloadSound();
    setIsPlay((prev) => !prev);
  }, [preloadSound]);

  const resetTimer = useCallback(() => {
    setIsPlay(false);
    setTime((prev) => ({
      ...prev,
      currentTime: timeUtils.secondsToTime(status?.workDuration ?? 1500),
      initialTime: timeUtils.secondsToTime(status?.workDuration ?? 1500),
    }));
    setStartedElement(false);
    setMenu("focus");
    totalSecondsRef.current = status?.workDuration ?? 1500;

    setCycles(totalCycles);
    resetTimerStore();
  }, [
    status,
    totalCycles,
    setCycles,
    setMenu,
    setStartedElement,
    setIsPlay,
    setTime,
    resetTimerStore,
  ]);

  return {
    playEndSound,
    togglePlay,
    resetTimer,
    preloadSound,
  };
}
