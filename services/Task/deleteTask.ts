"use server";

import { apiClient } from "../api";

export async function deleteTask({ _id }: { _id: string }): Promise<{
  success: boolean;
  res: string;
}> {
  try {
    const res = await apiClient.delete(`tasks/${_id}`);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error deleting task:", error);

    return {
      success: false,
      res: error.message,
    };
  }
}
