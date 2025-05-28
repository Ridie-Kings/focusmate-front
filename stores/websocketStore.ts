import { create } from "zustand";
import { Socket } from "socket.io-client";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";

interface WebSocketStore {
  status: PomodoroStatusType | null;
  socket: Socket | null;
  setStatus: (status: PomodoroStatusType | null) => void;
  setSocket: (socket: Socket | null) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  handleJoinPomodoro: (id: string) => Promise<boolean>;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  status: null,
  socket: null,
  setStatus: (status) => set({ status }),
  setSocket: (socket) => set({ socket }),
  isConnected: false,
  setIsConnected: (isConnected) => set({ isConnected }),
  handleJoinPomodoro: async (id: string) => {
    const socket = get().socket;
    if (!socket) return false;

    return new Promise((resolve) => {
      socket.emit("joinPomodoro", id, (response: boolean) => {
        resolve(response);
      });
    });
  },
}));
