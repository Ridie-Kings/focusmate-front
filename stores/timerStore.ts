"use client";
import { create } from "zustand";
import { TimerMode, TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { chipsIconType } from "@/components/Reusable/Chips";
import { DEFAULT_FOCUS_TIME } from "@/lib/TimerProviderUtils";
import { Dispatch, SetStateAction } from "react";

interface TimerStore {
  time: {
    currentTime: TimeType;
    initialTime: TimeType;
  };
  setTime: Dispatch<
    SetStateAction<{ currentTime: TimeType; initialTime: TimeType }>
  >;
  isPlay: boolean;
  setIsPlay: Dispatch<SetStateAction<boolean>>;
  togglePlay: () => void;
  resetTimer: () => void;
  isChronometer: boolean;
  toggleChronometerMode: (e: boolean) => void;
  menu: chipsIconType;
  setMenu: Dispatch<SetStateAction<chipsIconType>>;
  startedElement: boolean;
  setStartedElement: Dispatch<SetStateAction<boolean>>;
  isType: TimerMode;
  setIsType: (type: TimerMode) => void;
  cycles: number;
  setCycles: Dispatch<SetStateAction<number>>;
  totalCycles: number;
  setTotalCycles: Dispatch<SetStateAction<number>>;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  time: {
    currentTime: DEFAULT_FOCUS_TIME,
    initialTime: DEFAULT_FOCUS_TIME,
  },
  setTime: (time) => {
    set((state) => ({
      time: typeof time === "function" ? time(state.time) : time,
    }));
  },
  isPlay: false,
  setIsPlay: (isPlay) => set({ isPlay: isPlay as boolean }),
  togglePlay: () => {
    const state = get();

    if (state.isChronometer) {
      if (state.isPlay) {
        set({ isPlay: false });
      } else {
        set({ isPlay: true });
      }
    } else {
      if (state.isPlay) {
        set({ isPlay: false });
      } else {
        set({ isPlay: true });
      }
    }
  },
  resetTimer: () => {
    const state = get();
    set({
      time: {
        currentTime: state.time.initialTime,
        initialTime: state.time.initialTime,
      },
      isPlay: false,
    });
  },
  isChronometer: false,
  toggleChronometerMode: (e: boolean) =>
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
  menu: "focus",
  setMenu: (menu) => set({ menu: menu as chipsIconType }),
  startedElement: false,
  setStartedElement: (started) => set({ startedElement: started as boolean }),
  isType: "pomodoro",
  setIsType: (type) => set({ isType: type }),
  cycles: 0,
  setCycles: (cycles) => set({ cycles: cycles as number }),
  totalCycles: 4,
  setTotalCycles: (cycles) => set({ totalCycles: cycles as number }),
}));
