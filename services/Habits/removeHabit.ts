"use server";
import { apiClient } from "../api";

export async function removeHabit({
  _id,
}: {
  _id: string;
}): Promise<{ success: boolean; res: any }> {
  try {
    const res = await apiClient.delete(`habits/${_id}`);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error deleting habit:", error.message);
    return { success: false, res: error.message };
  }
}
