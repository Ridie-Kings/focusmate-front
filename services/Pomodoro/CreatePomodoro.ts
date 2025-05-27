"use server";
import { apiClient } from "../api";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";

export async function CreatePomodoro({
  cycles,
  workDuration,
  shortBreak,
  longBreak,
}: {
  cycles?: number;
  workDuration?: number;
  shortBreak?: number;
  longBreak?: number;
}): Promise<{
  success: boolean;
  res: PomodoroStatusType;
}> {
  try {
    const pomodoroData = {
      cycles,
      workDuration,
      shortBreak,
      longBreak,
    };

    const res = await apiClient.post("pomodoro/create", pomodoroData);

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error creating pomodoro:", error);

    return { success: false, res: error.message };
  }
}
