"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { Pomodoro } from "@/interfaces/websocket/WebSocketProvider";

export async function StopPomodoro({ id }: { id: string }): Promise<{
  success: boolean;
  res: Pomodoro | string;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.post(
      `pomodoro/${id}/stop`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.data.success) throw new Error(res.data.res);

    return { success: true, res: res.data };
  } catch (error: any) {
    console.error("Error stop timer:", error.response.data.message);
    return { success: false, res: error.response.data.message };
  }
}
