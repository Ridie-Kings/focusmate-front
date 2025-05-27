"use server";

import { apiClient } from "../api";
import { TaskType } from "@/interfaces/Task/TaskType";

export async function updateTask({
  _id,
  task,
}: {
  _id: string;
  task: any;
}): Promise<{
  success: boolean;
  res: TaskType;
}> {
  try {
    const res = await apiClient.patch(`tasks/${_id}`, task);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error updating task:", error);

    return { success: false, res: error.message };
  }
}
