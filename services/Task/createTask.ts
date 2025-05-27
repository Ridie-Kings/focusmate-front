"use server";

import { apiClient } from "../../lib/api";
import { TaskType } from "@/interfaces/Task/TaskType";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { format } from "date-fns";

export async function createTask({ task }: { task: tempTaskType }): Promise<{
  success: boolean;
  message: TaskType;
}> {
  try {
    const newTask = {
      ...task,
      startDate: task.startDate ? task.startDate.toISOString() : undefined,
      endDate: task.endDate ? task.endDate.toISOString() : undefined,
      dueDate: task.dueDate ? format(task.dueDate, "yyyy-MM-dd") : undefined,
    };

    const res = await apiClient.post("tasks", newTask);

    return { success: true, message: res?.data };
  } catch (error: any) {
    console.error("Error creating task:", error || error || error);
    return {
      success: false,
      message: error || error.message || "Unknown error",
    };
  }
}
