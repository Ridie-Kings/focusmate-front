import { Dispatch, RefObject, SetStateAction, useCallback } from "react";
import { timeUtils } from "@/components/Provider/TimerProvider/TimeUtils";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";

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
  const playEndSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Error:", err);
      });
    }
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlay((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsPlay(false);
    setTime((prev) => ({
      ...prev,
      currentTime: timeUtils.secondsToTime(status?.workDuration ?? 1500),
      initialTime: timeUtils.secondsToTime(status?.workDuration ?? 1500),
    }));
    setStartedElement(false);
    setMenu("enfoque");
    totalSecondsRef.current = status?.workDuration ?? 1500;

    setCycles(totalCycles);
  }, [status]);

  return {
    playEndSound,
    togglePlay,
    resetTimer,
  };
}
