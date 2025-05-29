"use server";
import { apiClient } from "../api";
import { Pomodoro } from "@/interfaces/websocket/WebSocketProvider";

export async function ResumePomodoro({ id }: { id: string }): Promise<{
  success: boolean;
  res: Pomodoro;
}> {
  try {
    const res = await apiClient.post(`pomodoro/${id}/resume`);

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error resume pomodoro:", error);

    return { success: false, res: error.message };
  }
}
