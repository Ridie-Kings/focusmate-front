import { Dispatch, SetStateAction } from "react";

export type TimeType = {
  min: number;
  seg: number;
  hours: number;
};

export type TimerContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<SetStateAction<TimeType>>;
  time: TimeType;
};
