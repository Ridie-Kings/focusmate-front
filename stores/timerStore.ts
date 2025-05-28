import { create } from "zustand";
import { TimerMode, TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { DEFAULT_FOCUS_TIME } from "@/lib/TimerProviderUtils";

interface TimerStore {
  time: {
    currentTime: TimeType;
    initialTime: TimeType;
  };
  setTime: (time: { currentTime: TimeType; initialTime: TimeType }) => void;
  isPlay: boolean;
  togglePlay: () => void;
  resetTimer: () => void;
  isChronometer: boolean;
  toggleChronometerMode: (e: boolean) => void;
  menu: chipsIconType;
  setMenu: (menu: chipsIconType) => void;
  startedElement: boolean;
  setStartedElement: (started: boolean) => void;
  isType: TimerMode;
  setIsType: (type: TimerMode) => void;
  cycles: number;
  setCycles: (cycles: number) => void;
  totalCycles: number;
  setTotalCycles: (cycles: number) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  time: {
    currentTime: DEFAULT_FOCUS_TIME,
    initialTime: DEFAULT_FOCUS_TIME,
  },
  setTime: (time) => set({ time }),
  isPlay: false,
  togglePlay: () => set((state) => ({ isPlay: !state.isPlay })),
  resetTimer: () =>
    set((state) => ({
      time: {
        currentTime: state.time.initialTime,
        initialTime: state.time.initialTime,
      },
      isPlay: false,
    })),
  isChronometer: false,
  toggleChronometerMode: (e) =>
    set((state) => {
      if (state.isPlay) return state;
      return {
        isChronometer: e,
        time: {
          ...state.time,
          currentTime: e
            ? { hours: 0, min: 0, seg: 0 }
            : state.time.initialTime,
        },
      };
    }),
  menu: "enfoque",
  setMenu: (menu) => set({ menu }),
  startedElement: false,
  setStartedElement: (started) => set({ startedElement: started }),
  isType: "pomodoro",
  setIsType: (type) => set({ isType: type }),
  cycles: 0,
  setCycles: (cycles) => set({ cycles }),
  totalCycles: 4,
  setTotalCycles: (cycles) => set({ totalCycles: cycles }),
}));
