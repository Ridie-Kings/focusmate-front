import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { Dispatch, RefObject, SetStateAction, useCallback } from "react";

export default function ChronometerUtils({
  setIsPlay,
  setTime,
  totalSecondsRef,
}: {
  setIsPlay: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<
    SetStateAction<{
      currentTime: TimeType;
      initialTime: TimeType;
    }>
  >;
  totalSecondsRef: RefObject<number>;
}) {
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
    setTime((prev) => ({ ...prev, currentTime: { hours: 0, min: 0, seg: 0 } }));
    if (totalSecondsRef && totalSecondsRef.current !== null) {
      totalSecondsRef.current = 0;
    }

    try {
      localStorage.setItem("chronometer_seconds", "0");
      localStorage.setItem("chronometer_isPlay", "false");
    } catch (error) {
      console.error("Error resetting localStorage:", error);
    }
  }, []);
  return {
    resetTimer,
    togglePlay,
  };
}
