"use server";

import { apiClient } from "../api";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";

export async function UpdatePomodoroById({
  id,
  pomodoro,
}: {
  id: string;
  pomodoro: {
    cycles: number;
    workDuration: number;
    shortBreak: number;
    longBreak: number;
  };
}): Promise<{
  success: boolean;
  res: PomodoroStatusType;
}> {
  const { cycles, workDuration, shortBreak, longBreak } = pomodoro;

  try {
    const res = await apiClient.patch(`pomodoro/${id}`, {
      cycles,
      workDuration,
      shortBreak,
      longBreak,
    });

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error updating pomodoro:", error);

    return { success: false, res: error.message };
  }
}
