"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
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
    const token = await getToken();

    const res = await apiConnection.patch(
      `pomodoro/${id}`,
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
    console.error("Error updating timer:", error.response?.data);
    return { success: false, res: error.response.data };
  }
}
