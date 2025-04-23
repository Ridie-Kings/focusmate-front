import { chipsIconType } from "@/components/Reusable/Chips";
import { Dispatch, SetStateAction } from "react";

export type TimeType = {
  min: number;
  seg: number;
  hours: number;
};

export type TimerContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  time: TimeType;
  setTime: Dispatch<SetStateAction<TimeType>>;
  isPlay: boolean;
  initialTime: TimeType;
  setInitialTime: Dispatch<SetStateAction<TimeType>>;
  togglePlay: () => void;
  resetTimer: () => void;
  isChronometer: boolean;
  toggleChronometerMode: (type: boolean) => void;
  menu: chipsIconType;
  setMenu: Dispatch<SetStateAction<chipsIconType>>;
  startedElement: boolean;
};
