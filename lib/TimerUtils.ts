import { Dispatch, RefObject, SetStateAction, useCallback } from "react";
import { timeUtils } from "@/components/Provider/TimerProvider/TimeUtils";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { PomodoroStatus } from "@/interfaces/websocket/WebSocketProvider";

export default function TimerUtils({
  audioRef,
  setIsPlay,
  setTime,
  totalSecondsRef,
  setMenu,
  status,
  totalCycles,
  setCycles,
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
  status: PomodoroStatus | null;
  totalCycles: number | undefined;
  setCycles: Dispatch<SetStateAction<number | undefined>>;
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
      currentTime: timeUtils.secondsToTime(status?.workDuration ?? 25),
      initialTime: timeUtils.secondsToTime(status?.workDuration ?? 25),
    }));
    setMenu("enfoque");
    totalSecondsRef.current = status?.workDuration ?? 25;
    console.log(totalCycles);

    setCycles(totalCycles);
  }, [status]);

  return {
    playEndSound,
    togglePlay,
    resetTimer,
  };
}
