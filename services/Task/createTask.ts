"use server";

import { apiClient } from "../api";
import { TaskType } from "@/interfaces/Task/TaskType";
import { tempTaskType } from "@/interfaces/Modal/ModalType";

export async function createTask({ task }: { task: tempTaskType }): Promise<{
  success: boolean;
  res: TaskType;
}> {
  try {
    const newTask = {
      ...task,
      ...(task.startDate && { startDate: task.startDate.toISOString() }),
      ...(task.endDate && { endDate: task.endDate.toISOString() }),
      ...(task.dueDate && { dueDate: task.dueDate.toISOString() }),
    };

    const res = await apiClient.post("tasks", newTask);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error creating task:", error);

    return { success: false, res: error.message };
  }
}
