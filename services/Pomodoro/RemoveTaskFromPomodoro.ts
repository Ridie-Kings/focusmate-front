"use server";

import { apiClient } from "../api";
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
    const res = await apiClient.delete(
      `pomodoro-task-link/${pomodoroId}/unlink`
    );

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error removing task from pomodoro:", error);

    return { success: false, res: error.message };
  }
}
