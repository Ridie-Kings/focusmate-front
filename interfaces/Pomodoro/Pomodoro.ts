import { chipsIconType } from "@/components/Reusable/Chips";
import { Dispatch, SetStateAction } from "react";

export type TimeType = {
  min: number;
  seg: number;
  hours: number;
};

export type TimerMode = "pomodoro" | "cronometro" | "temporizador";

export type TimerContextType = {
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
  isPlay: boolean;
  togglePlay: () => void;
  resetTimer: () => void;
  isChronometer: boolean;
  toggleChronometerMode: (type: boolean) => void;
  menu: chipsIconType;
  setMenu: Dispatch<SetStateAction<chipsIconType>>;
  startedElement: boolean;
  setStartedElement: Dispatch<SetStateAction<boolean>>;
  setIsType: Dispatch<
    SetStateAction<"pomodoro" | "cronometro" | "temporizador">
  >;
  isType: "pomodoro" | "cronometro" | "temporizador";
  cycles: number;
  totalCycles: number;
};
