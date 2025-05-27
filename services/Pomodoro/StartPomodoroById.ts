"use server";
import { apiClient } from "../../lib/api";
import { Pomodoro } from "@/interfaces/websocket/WebSocketProvider";

export async function StartPomodoroById({ id }: { id: string }): Promise<{
  success: boolean;
  res: Pomodoro;
}> {
  try {
    const res = await apiClient.post(`pomodoro/${id}/start`);

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error starting timer:", error.message);
    return { success: false, res: error.message };
  }
}
