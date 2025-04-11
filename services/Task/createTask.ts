"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { TaskType } from "@/interfaces/Task/TaskType";

export async function createTask({
  task,
}: {
  task: {
    title: string;
    description: string;
    status: string;
    startDate: Date;
    endDate: Date;
    dueDate: Date;
    tags: string[];
  };
}): Promise<{
  success: boolean;
  message: TaskType;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.post("tasks", task, {
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
