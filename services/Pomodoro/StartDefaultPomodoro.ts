"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { PomodoroStatus } from "@/interfaces/websocket/WebSocketProvider";

export async function StartDefaultPomodoro(): Promise<{
  success: boolean;
  res: PomodoroStatus;
}> {
  try {
    const token = await getToken();
    console.log("TOKEN", token);

    const res = await apiConnection.post(
      "pomodoro/default",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);

    return { success: true, res: res.data };
  } catch (error: any) {
    console.error("Error starting timer:", error.response?.data);
    return { success: false, res: error.response.data };
  }
}
