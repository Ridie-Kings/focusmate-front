"use client";
import { createContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

type PomodoroStatus = {
  userId: string;
  pomodoroId: string | null;
  active: boolean;
  remainingTime: number;
  isBreak?: boolean;
  isPaused?: boolean;
};

type SocketIOContextType = {
  status: PomodoroStatus | null;
  startPomodoro:
    | ((duration?: number, breakDuration?: number) => void)
    | undefined;
  stopPomodoro: ((pomodoroId: string) => void) | undefined;
  pausePomodoro: (() => void) | undefined;
  resumePomodoro: (() => void) | undefined;
  socket: Socket | null;
};

export const SocketIOContext = createContext<SocketIOContextType>({
  status: null,
  startPomodoro: undefined,
  stopPomodoro: undefined,
  pausePomodoro: undefined,
  resumePomodoro: undefined,
  socket: null,
});

function getUserIdFromToken(token: string): string {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    return payload.sub || payload.userId || payload.id;
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
  const [startPomodoro, setStartPomodoro] = useState<
    ((duration?: number, breakDuration?: number) => void) | undefined
  >(undefined);
  const [stopPomodoro, setStopPomodoro] = useState<
    ((pomodoroId: string) => void) | undefined
  >(undefined);
  const [pausePomodoro, setPausePomodoro] = useState<(() => void) | undefined>(
    undefined
  );
  const [resumePomodoro, setResumePomodoro] = useState<
    (() => void) | undefined
  >(undefined);

  useEffect(() => {
    if (token) {
      const userId = getUserIdFromToken(token);

      const socketInstance = io("ws://sherp-app.com/pomodoro", {
        transports: ["websocket"],
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
        query: {
          userId: userId,
        },
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });
      console.log(socketInstance);

      console.log("Initializing socket connection for user:", userId);

      socketInstance.on("connect", () => {
        console.log("Pomodoro WebSocket connected");

        // Set up startPomodoro function
        setStartPomodoro(() => (duration?: number, breakDuration?: number) => {
          console.log("Starting pomodoro:", {
            userId,
            duration: duration || 1500,
            breakDuration: breakDuration || 300,
          });

          socketInstance.emit("startPomodoro", {
            userId: userId,
            duration: duration || 1500,
            breakDuration: breakDuration || 300,
          });
        });

        // Set up stopPomodoro function
        setStopPomodoro(() => (pomodoroId: string) => {
          console.log("Stopping pomodoro:", { pomodoroId });
          socketInstance.emit("stopPomodoro", { pomodoroId });
        });

        // Set up pausePomodoro function
        setPausePomodoro(() => () => {
          console.log("Pausing pomodoro for user:", userId);
          socketInstance.emit("pausePomodoro", { userId });
        });

        // Set up resumePomodoro function
        setResumePomodoro(() => () => {
          console.log("Resuming pomodoro for user:", userId);
          socketInstance.emit("resumePomodoro", { userId });
        });

        // Get initial pomodoro status on connection
        socketInstance.emit("getPomodoroStatus", { userId });
      });

      socketInstance.on("pomodoroStatus", (data: PomodoroStatus) => {
        console.log("Received pomodoro status:", data);
        setStatus(data);
      });

      socketInstance.on("pomodoroStarted", (data: unknown) => {
        console.log("Pomodoro started:", data);
      });

      socketInstance.on("connect_error", (error: Error) => {
        console.error("Pomodoro WebSocket connection error:", error);
      });

      socketInstance.on("disconnect", (reason: Socket.DisconnectReason) => {
        console.log(`Pomodoro WebSocket disconnected. Reason: ${reason}`);
        setStatus(null);
      });

      socketInstance.on("error", (error: unknown) => {
        console.error("Pomodoro error:", error);
      });

      setSocket(socketInstance);

      // Clean up function
      return () => {
        console.log("Cleaning up socket connection");
        socketInstance.disconnect();
        setSocket(null);
        setStartPomodoro(undefined);
        setStopPomodoro(undefined);
        setPausePomodoro(undefined);
        setResumePomodoro(undefined);
      };
    }
  }, [token]);

  return (
    <SocketIOContext.Provider
      value={{
        status,
        startPomodoro,
        stopPomodoro,
        pausePomodoro,
        resumePomodoro,
        socket,
      }}
    >
      {children}
    </SocketIOContext.Provider>
  );
};
