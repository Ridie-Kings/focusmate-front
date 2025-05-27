"use server";

import { apiClient } from "../api";
import { Pomodoro } from "@/interfaces/websocket/WebSocketProvider";

export async function StopPomodoro({ id }: { id: string }): Promise<{
  success: boolean;
  res: Pomodoro | string;
}> {
  try {
    const res = await apiClient.post(`pomodoro/${id}/stop`);
    if (!res.success) throw new Error(res.res);

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error stop timer:", error.message);
    return { success: false, res: error.message.message };
  }
}
