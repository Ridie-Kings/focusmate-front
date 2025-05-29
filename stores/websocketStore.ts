import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import {
  PomodoroStatusType,
  Pomodoro,
} from "@/interfaces/websocket/WebSocketProvider";
import WebsocketUtils from "@/lib/WebsocketUtils";
import { Dispatch, SetStateAction } from "react";
import { useTimerStore } from "./timerStore";

const { getUserIdFromToken } = WebsocketUtils();

interface WebSocketStore {
  status: PomodoroStatusType | null;
  socket: Socket | null;
  setStatus: Dispatch<SetStateAction<PomodoroStatusType | null>>;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
  handleJoinPomodoro: (id: string) => void;
  initSocket: (token: string) => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  status: null,
  socket: null,
  setStatus: (status) => set({ status: status as PomodoroStatusType }),
  setSocket: (socket) => set({ socket: socket as Socket }),
  isConnected: false,
  setIsConnected: (isConnected) => set({ isConnected: isConnected as boolean }),
  initSocket: (token: string) => {
    if (!token) {
      console.error("No token provided, cannot connect to WebSocket");
      return;
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      console.error("Could not extract userId from token");
      return;
    }

    const socketUrl =
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || "wss://sherp-app.com";
    console.log(
      `Initializing socket connection to ${socketUrl} for user: ${userId}`
    );

    const socket = io(socketUrl, {
      path: "/api/v0/pomodoro/ws",
      transports: ["websocket"],
      auth: {
        token: `Bearer ${token}`,
      },
      query: {
        userId,
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    socket.on("connect", () => {
      console.log("Pomodoro WebSocket connected");
      set({ isConnected: true });
    });

    socket.on("pomodoro found", (pomodoro: Pomodoro) => {
      console.log("Received pomodoro found:", pomodoro);
      if (pomodoro && pomodoro._id) {
        socket.emit("join", { id: pomodoro._id });
      }
    });

    socket.on("status", (status: PomodoroStatusType) => {
      console.log("Status update received:", status);
      if (!status) {
        console.warn("Received empty status update");
        return;
      }
      if (
        status.state !== "idle" &&
        status.state !== "completed" &&
        status.state !== "finished"
      ) {
        useTimerStore.getState().setStartedElement(true);
      }
      set({ status });
    });

    socket.on("connect_error", (error: Error) => {
      console.error("Pomodoro WebSocket connection error:", error);
      set({ isConnected: false });
    });

    socket.on("disconnect", (reason: string) => {
      console.log(`Pomodoro WebSocket disconnected. Reason: ${reason}`);
      set({ status: null, isConnected: false });
    });

    socket.on("error", (error: unknown) => {
      console.error("Pomodoro error:", error);
    });

    set({ socket });
  },
  handleJoinPomodoro: (id: string) => {
    const socket = get().socket;
    if (!socket) return;

    try {
      socket.emit("join", { id });
    } catch (e) {
      console.log("error ws", e);
    }
  },
}));
