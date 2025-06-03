import { TimerContextType, TimeType } from "@/interfaces/Pomodoro/Pomodoro";

export const DEFAULT_FOCUS_TIME: TimeType = { hours: 0, min: 25, seg: 0 };
export const DEFAULT_SHORT_BREAK: TimeType = { hours: 0, min: 5, seg: 0 };

export const defaultContextValue: TimerContextType = {
  time: {
    currentTime: DEFAULT_FOCUS_TIME,
    initialTime: DEFAULT_FOCUS_TIME,
  },
  setTime: () => {},
  isPlay: false,
  togglePlay: () => {},
  resetTimer: () => {},
  isChronometer: false,
  toggleChronometerMode: () => {},
  setMenu: () => {},
  menu: "focus",
  startedElement: false,
  setStartedElement: () => {},
  setIsType: () => {},
  isType: "pomodoro",
  cycles: 0,
  totalCycles: 0,
};
