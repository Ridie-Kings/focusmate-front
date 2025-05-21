"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { TaskType } from "@/interfaces/Task/TaskType";

export async function RemoveTaskFromPomodoro({
  pomodoroId,
}: {
  pomodoroId: string;
}): Promise<{
  success: boolean;
  res: TaskType;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.delete(
      `/pomodoro-task-link/${pomodoroId}/unlink`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, res: res.data };
  } catch (error: any) {
    console.error("Error adding task to pomodoro:", error.response?.data);
    return { success: false, res: error.response.data };
  }
}
