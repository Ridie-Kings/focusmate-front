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
  isPlay: boolean;
  isChronometer: boolean;
  menu: chipsIconType;
  startedElement: boolean;
  isType: TimerMode;
  cycles: number;
  totalCycles: number;

  actions: {
    setTime: Dispatch<
      SetStateAction<{ currentTime: TimeType; initialTime: TimeType }>
    >;
    setIsPlay: Dispatch<SetStateAction<boolean>>;
    togglePlay: () => void;
    resetTimer: () => void;
    toggleChronometerMode: (e: boolean) => void;
    setMenu: Dispatch<SetStateAction<chipsIconType>>;
    setStartedElement: Dispatch<SetStateAction<boolean>>;
    setIsType: (type: TimerMode) => void;
    setCycles: Dispatch<SetStateAction<number>>;
    setTotalCycles: Dispatch<SetStateAction<number>>;
  };
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  time: {
    currentTime: DEFAULT_FOCUS_TIME,
    initialTime: DEFAULT_FOCUS_TIME,
  },
  isPlay: false,
  isChronometer: false,
  menu: "focus",
  startedElement: false,
  isType: "pomodoro",
  cycles: 0,
  totalCycles: 4,

  actions: {
    setTime: (time) => {
      set((state) => ({
        time: typeof time === "function" ? time(state.time) : time,
      }));
    },
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
    setMenu: (menu) => set({ menu: menu as chipsIconType }),
    setStartedElement: (started) => set({ startedElement: started as boolean }),
    setIsType: (type) => set({ isType: type }),
    setCycles: (cycles) => set({ cycles: cycles as number }),
    setTotalCycles: (cycles) => set({ totalCycles: cycles as number }),
  },
}));

export const useCycles = () => useTimerStore((state) => state.cycles);
export const useTotalCycles = () => useTimerStore((state) => state.totalCycles);
export const useMenu = () => useTimerStore((state) => state.menu);
export const useIsPlay = () => useTimerStore((state) => state.isPlay);
export const useIsType = () => useTimerStore((state) => state.isType);
export const useStartedElement = () =>
  useTimerStore((state) => state.startedElement);
export const useIsChronometer = () =>
  useTimerStore((state) => state.isChronometer);
export const useTime = () => useTimerStore((state) => state.time);
