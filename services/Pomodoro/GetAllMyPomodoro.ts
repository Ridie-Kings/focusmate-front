"use server";
import { apiClient } from "../api";
import { Pomodoro } from "@/interfaces/websocket/WebSocketProvider";

export async function GetAllMyPomodoro(): Promise<{
  success: boolean;
  res: Pomodoro[];
}> {
  try {
    const res = await apiClient.get("pomodoro/@me");

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error getting all my pomodoros:", error);

    return { success: false, res: error.message };
  }
}
