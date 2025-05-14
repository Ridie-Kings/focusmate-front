import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export type Pomodoro = {
  _id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  cycles: number;
  currentCycle: number;
  state:
    | "idle"
    | "working"
    | "shortBreak"
    | "longBreak"
    | "finished"
    | "completed";
  isShared: boolean;
  sharedWith: string[];
  interruptions: number;
  remainingTime: number | null;
  pausedState: "paused" | null;
};

export type PomodoroStatus = {
  _id: string;
  state:
    | "idle"
    | "working"
    | "shortBreak"
    | "longBreak"
    | "finished"
    | "completed";
  currentCycle: number;
  startAt: Date;
  endsAt: Date;
  remainingTime: number | null;
  pausedState: "paused" | null;
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  cycles: number;
};

export type SocketIOContextType = {
  status: PomodoroStatus | null;
  socket: Socket | null;
  setStatus: Dispatch<SetStateAction<PomodoroStatus | null>>;
  handleJoinPomodoro: (id: string) => void;
  isConnected: boolean;
};
