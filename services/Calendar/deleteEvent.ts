"use server";

import { apiClient } from "../api";

export async function deleteEvent({ _id }: { _id: string }): Promise<{
  success: boolean;
  res: string;
}> {
  try {
    const res = await apiClient.delete(`events-calendar/${_id}`);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error deleting event:", error);

    return {
      success: false,
      res: error.message,
    };
  }
}
