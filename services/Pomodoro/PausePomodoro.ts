"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { Pomodoro } from "@/interfaces/websocket/WebSocketProvider";

export async function PausePomodoro({ id }: { id: string }): Promise<{
  success: boolean;
  res: Pomodoro;
}> {
  try {
    const token = await getToken();
    console.log("TOKEN", token);

    const res = await apiConnection.post(
      `pomodoro/${id}/pause`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, res: res.data };
  } catch (error: any) {
    console.error("Error starting timer:", error.response?.data);
    return { success: false, res: error.response };
  }
}
