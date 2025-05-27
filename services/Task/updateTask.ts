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
  message: TaskType;
}> {
  try {
    const res = await apiClient.patch(`tasks/${_id}`, task);

    return { success: true, message: res?.data };
  } catch (error: any) {
    console.error("Error creating task:", error || error || error);
    return {
      success: false,
      message: error || error.message || "Unknown error",
    };
  }
}
