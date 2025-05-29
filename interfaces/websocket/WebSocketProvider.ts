import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { TaskType } from "../Task/TaskType";

export type Pomodoro = {
  _id: string;
  userId: string;
  startAt: Date;
  endAt: Date;
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
  remainingTime: number;
  pausedState: "paused" | null;
  task: TaskType | null;
};

export type PomodoroStatusType = {
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
  endAt: Date;
  currentTime: number;
  remainingTime: number;
  pausedState: "paused" | null;
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  cycles: number;
  task: TaskType | null;
};

export type SocketIOContextType = {
  status: PomodoroStatusType | null;
  socket: Socket | null;
  setStatus: Dispatch<SetStateAction<PomodoroStatusType | null>>;
  handleJoinPomodoro: (id: string) => void;
  isConnected: boolean;
};
