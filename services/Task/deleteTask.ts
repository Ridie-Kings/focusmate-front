"use server";

import { apiClient } from "../../lib/api";

export async function deleteTask({ _id }: { _id: string }): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const res = await apiClient.delete(`tasks/${_id}`);

    return { success: true, message: res?.data };
  } catch (error: any) {
    console.error("Error deleting task:", error || error || error);
    return {
      success: false,
      message: error || error.message || "Unknown error",
    };
  }
}
