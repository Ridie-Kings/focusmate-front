"use server";
import { apiClient } from "../api";
import { TaskType } from "@/interfaces/Task/TaskType";

export async function AddTaskToPomodoro({
  taskId,
  pomodoroId,
}: {
  taskId: string;
  pomodoroId: string;
}): Promise<{
  success: boolean;
  res: TaskType;
}> {
  const url = `pomodoro-task-link/${pomodoroId}/link/${taskId}`;
  try {
    const res = await apiClient.post(url);

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error adding task to pomodoro:", error);

    return { success: false, res: error.message };
  }
}
