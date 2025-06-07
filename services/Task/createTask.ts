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
      ...(task.startDate && { startDate: task.startDate.toISOString() }),
      ...(task.endDate && { endDate: task.endDate.toISOString() }),
      dueDate: format(task.dueDate ?? new Date(), "yyyy-MM-dd"),
    };

    console.log("newTask", newTask);

    const res = await apiClient.post("tasks", newTask);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error creating task:", error);

    return { success: false, res: error.message };
  }
}
