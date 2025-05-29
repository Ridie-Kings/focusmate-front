"use server";

import { apiClient } from "../api";
import { TaskType } from "@/interfaces/Task/TaskType";

export async function getMyTask(): Promise<{
  success: boolean;
  res: TaskType[];
}> {
  try {
    const res = await apiClient.get("tasks");

    return { success: true, res };
  } catch (error: any) {
    console.error("Error fetching tasks:", error);

    return { success: false, res: error.message };
  }
}
