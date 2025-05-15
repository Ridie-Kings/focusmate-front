"use client";
import {
  Pomodoro,
  PomodoroStatus,
  SocketIOContextType,
} from "@/interfaces/websocket/WebSocketProvider";
import { createContext, useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export const SocketIOContext = createContext<SocketIOContextType>({
  status: null,
  socket: null,
  setStatus: () => {},
  handleJoinPomodoro: () => Promise.resolve(false),
  isConnected: false,
});

function getUserIdFromToken(token: string): string {
  if (!token) return "";

  try {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid token format");

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    return payload.sub || payload.userId || payload.id || "";
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return "";
  }
}

export const SocketIOProvider: React.FC<{
  children: React.ReactNode;
  token: string;
}> = ({ children, token }) => {
  const [status, setStatus] = useState<PomodoroStatus | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleJoinPomodoro = (id: string) => {
    console.log("EMIT", id);

    try {
      const res = socket?.emit(
        "join",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (e) {
      console.log("error ws", e);
    }
  };

  useEffect(() => {
    let socketInstance: Socket | null = null;

    const connectSocket = () => {
      if (!token) {
        console.warn("No token provided, cannot connect to WebSocket");
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

      socketInstance = io(socketUrl, {
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

      socketInstance.on("connect", () => {
        console.log("Pomodoro WebSocket connected");
        setIsConnected(true);
      });

      socketInstance.on("pomodoro found", (pomodoro: Pomodoro) => {
        console.log("Received pomodoro found:", pomodoro);

        if (pomodoro && pomodoro._id) {
          socketInstance?.emit("join", { id: pomodoro._id });
        }
      });

      socketInstance.on("status", (pomodoroStatus: PomodoroStatus) => {
        console.log("Status update received:", pomodoroStatus);

        if (!pomodoroStatus) {
          console.warn("Received empty status update");
          return;
        }

        setStatus(pomodoroStatus);
      });

      socketInstance.on("connect_error", (error: Error) => {
        console.error("Pomodoro WebSocket connection error:", error);
        setIsConnected(false);
      });

      socketInstance.on("disconnect", (reason: string) => {
        console.log(`Pomodoro WebSocket disconnected. Reason: ${reason}`);
        setStatus(null);
        setIsConnected(false);
      });

      socketInstance.on("error", (error: unknown) => {
        console.error("Pomodoro error:", error);
      });

      setSocket(socketInstance);
    };

    connectSocket();

    return () => {
      console.log("Cleaning up socket connection");
      if (socketInstance) {
        socketInstance.disconnect();
      }
      setSocket(null);
      setStatus(null);
      setIsConnected(false);
    };
  }, [token]);

  return (
    <SocketIOContext.Provider
      value={{
        status,
        socket,
        setStatus,
        handleJoinPomodoro,
        isConnected,
      }}
    >
      {children}
    </SocketIOContext.Provider>
  );
};
