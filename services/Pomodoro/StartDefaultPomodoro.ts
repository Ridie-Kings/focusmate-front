"use server";
import { apiClient } from "../api";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";

export async function StartDefaultPomodoro(): Promise<{
  success: boolean;
  res: PomodoroStatusType;
}> {
  try {
    const res = await apiClient.post("pomodoro/start-default");

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error starting default timer:", error.message);
    return { success: false, res: error.message };
  }
}
