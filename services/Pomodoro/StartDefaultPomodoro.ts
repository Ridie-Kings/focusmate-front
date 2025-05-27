"use server";
import { apiClient } from "../api";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";

export async function StartDefaultPomodoro(): Promise<{
  success: boolean;
  res: PomodoroStatusType;
}> {
  try {
    const res = await apiClient.post("pomodoro/default");

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error starting default pomodoro:", error);

    return { success: false, res: error.message };
  }
}
