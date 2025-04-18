"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export type PomodoroStatus = {
  userId: string;
  pomodoroId: string | null;
  active: boolean;
  remainingTime: number;
  isBreak?: boolean;
  isPaused?: boolean;
};

type SocketIOContextType = {
  status: PomodoroStatus | null;
  startPomodoro: ((duration?: number, breakDuration?: number) => Promise<void>);
  stopPomodoro: (() => Promise<void>);
  pausePomodoro: (() => Promise<void>);
  resumePomodoro: (() => Promise<void>);
  joinSharedPomodoro: ((shareCode: string) => Promise<void>);
  socket: Socket | null;
  isConnected: boolean;
};

export const SocketIOContext = createContext<SocketIOContextType>({
  status: null,
  startPomodoro: async () => Promise.resolve(),
  stopPomodoro: async () => Promise.resolve(),
  pausePomodoro: async () => Promise.resolve(),
  resumePomodoro: async () => Promise.resolve(), 
  joinSharedPomodoro: async () => Promise.resolve(),
  socket: null,
  isConnected: false
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
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) return;
    
    const userId = getUserIdFromToken(token);
    if (!userId) {
      console.error("Could not extract userId from token");
      return;
    }

    const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "wss://sherp-app.com", {
        path: "/api/v0/pomodoro",
        transports: ["websocket"],
        auth: {
          token: `Bearer ${token}`,
        },
        query: {
            userId: userId,
        },
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
    });

    console.log("Initializing socket connection for user:", userId);

    socketInstance.on("connect", () => {
      console.log("Pomodoro WebSocket connected");
      setIsConnected(true);
      socketInstance.emit("getPomodoroStatus", {userId})
    });

    socketInstance.on("pomodoroStatus", (data: PomodoroStatus) => {
      console.log("Received pomodoro status:", data);
      setStatus(data);
    });

    socketInstance.on("pomodoroStarted", (data: {success: boolean, pomodoro: PomodoroStatus}) => {
      console.log("Received pomodoro started:", data);
      if (data.success) {
        setStatus(data.pomodoro);
      }
      
    });

    socketInstance.on("pomodoroStopped", (data: {success: boolean}) => {
      console.log("Received pomodoro stopped:", data);
      if (data.success) {
        setStatus(null);
      }
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

    return () => {
      console.log("Cleaning up socket connection");
      socketInstance.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, [token]);

  const startPomodoro = useCallback(
    async (duration: number = 1500, breakDuration: number = 300) => {
      if (!socket || !isConnected) return;
      const userId = getUserIdFromToken(token);
      console.log("Starting pomodoro:", {
        userId,
        duration,
        breakDuration,
      });

      return new Promise<void>((resolve, reject) => {
        socket.emit("startPomodoro", {
          userId,
          duration,
          breakDuration,
        }, (response: any) => {
          if (response.success) {
            setStatus({
              userId,
              remainingTime: duration,
              isPaused: false,
              isBreak: false,
              active: true,
              pomodoroId: response.pomodoro.pomodoroId
            })
            resolve();
          } else {
            reject(new Error(response.error || "Failed to start pomodoro"));
          }
        });
      });
    },
    [socket, isConnected, token]
  );

  
  const stopPomodoro = useCallback(
    async () => {
      if (!socket || !isConnected) return;
      
      console.log("Stopping pomodoro:", status?.pomodoroId );
      
      return new Promise<void>((resolve, reject) => {
        socket.emit("stopPomodoro", status?.pomodoroId, (response: any) => {
          if (response.success) {
            resolve();
          } else {
            reject(new Error(response.error || "Failed to stop pomodoro"));
          }
        });
      });
    },
    [socket, isConnected, status]
  );

  const pausePomodoro = useCallback(
    async () => {
      if (!socket || !isConnected) return;
      
      const userId = getUserIdFromToken(token);
      console.log("Pausing pomodoro for user:", userId);
      
      return new Promise<void>((resolve, reject) => {
        socket.emit("pausePomodoro", { userId }, (response: any) => {
          if (response.success) {
            resolve();
          } else {
            reject(new Error(response.error || "Failed to pause pomodoro"));
          }
        });
      });
    },
    [socket, isConnected, token]
  );

  const resumePomodoro = useCallback(
    async () => {
      if (!socket || !isConnected) return;
      
      const userId = getUserIdFromToken(token);
      console.log("Resuming pomodoro for user:", userId);
      
      return new Promise<void>((resolve, reject) => {
        socket.emit("resumePomodoro", { userId }, (response: any) => {
          if (response.success) {
            resolve();
          } else {
            reject(new Error(response.error || "Failed to resume pomodoro"));
          }
        });
      });
    },
    [socket, isConnected, token]
  );

  const joinSharedPomodoro = useCallback(
    async (shareCode: string) => {
      if (!socket || !isConnected) return;
      
      const userId = getUserIdFromToken(token);
      console.log("Joining shared pomodoro:", { shareCode, userId });
      
      return new Promise<void>((resolve, reject) => {
        socket.emit("joinSharedPomodoro", { shareCode, userId }, (response: any) => {
          if (response.success) {
            resolve();
          } else {
            reject(new Error(response.error || "Failed to join shared pomodoro"));
          }
        });
      });
    },
    [socket, isConnected, token]
  );

  return (
    <SocketIOContext.Provider
      value={{
        status,
        startPomodoro,
        stopPomodoro,
        pausePomodoro,
        resumePomodoro,
        joinSharedPomodoro,
        socket,
        isConnected
      }}
    >
      {children}
    </SocketIOContext.Provider>
  );
};