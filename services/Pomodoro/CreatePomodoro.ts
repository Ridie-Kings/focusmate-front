"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
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
    const token = await getToken();

    const res = await apiConnection.post(
      "pomodoro/create",
      {
        cycles,
        workDuration,
        shortBreak,
        longBreak,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, res: res.data };
  } catch (error: any) {
    console.error("Error creating timer:", error.response?.data);
    return { success: false, res: error.response.data };
  }
}
