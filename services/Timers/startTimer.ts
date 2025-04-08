"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function startTimer({
  task,
  title,
}: {
  task: string;
  title: string;
}): Promise<{ success: boolean; res: any }> {
  try {
    const token = await getToken();

    const res = await apiConnection.post(
      "timers/start",
      { task, title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, res: res.data };
  } catch (error: any) {
    console.error("Error starting timer:", error.response.data.message);
    return { success: false, res: error.response };
  }
}
