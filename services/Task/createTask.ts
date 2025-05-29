"use server";

import { apiClient } from "../api";
import { TaskType } from "@/interfaces/Task/TaskType";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { format } from "date-fns";

export async function createTask({ task }: { task: tempTaskType }): Promise<{
  success: boolean;
  res: TaskType;
}> {
  try {
    const newTask = {
      ...task,
      startDate: task.startDate ? task.startDate.toISOString() : undefined,
      endDate: task.endDate ? task.endDate.toISOString() : undefined,
      dueDate: task.dueDate ? format(task.dueDate, "yyyy-MM-dd") : undefined,
    };

    const res = await apiClient.post("tasks", newTask);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error creating task:", error);

    return { success: false, res: error.message };
  }
}
