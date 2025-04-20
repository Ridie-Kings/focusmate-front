"use client";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";

export const timeUtils = {
  timeToSeconds: (t: TimeType): number => t.hours * 3600 + t.min * 60 + t.seg,
  secondsToTime: (seconds: number): TimeType => ({
    hours: Math.floor(seconds / 3600),
    min: Math.floor((seconds % 3600) / 60),
    seg: seconds % 60,
  }),
};
