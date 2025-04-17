"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
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
    const token = await getToken();

    const res = await apiConnection.patch(`tasks/${_id}`, task, {
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
