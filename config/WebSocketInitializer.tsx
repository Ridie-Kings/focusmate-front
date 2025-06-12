"use client";
import { useEffect } from "react";
import { useWebSocketStore } from "@/stores/websocketStore";

export default function WebSocketInitializer({ token }: { token: string }) {
  const { initSocket } = useWebSocketStore((state) => state.actions);

  useEffect(() => {
    initSocket(token);
  }, [token]);

  return null;
}
