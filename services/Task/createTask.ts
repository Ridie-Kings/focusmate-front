"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { TaskType } from "@/interfaces/Task/TaskType";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { format } from "date-fns";

export async function createTask({ task }: { task: tempTaskType }): Promise<{
  success: boolean;
  message: TaskType;
}> {
  try {
    const token = await getToken();

    const newTask = {
      ...task,
      startDate: task.startDate ? task.startDate.toISOString() : undefined,
      endDate: task.endDate ? task.endDate.toISOString() : undefined,
      dueDate: task.dueDate ? format(task.dueDate, "yyyy-MM-dd") : undefined,
    };

    const res = await apiConnection.post("tasks", newTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: res?.data };
  } catch (error: any) {
    console.error(
      "Error creating task:",
      error.response?.data || error.response || error
    );
    return {
      success: false,
      message: error.response?.data || error.message || "Unknown error",
    };
  }
}
