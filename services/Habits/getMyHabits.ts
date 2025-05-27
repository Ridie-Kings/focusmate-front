"use server";
import { apiClient } from "../../lib/api";

export async function getMyHabits(): Promise<{ success: boolean; res: any }> {
  try {
    const res = await apiClient.get("habits");

    return { success: true, res };
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
    return { success: false, res: error.message };
  }
}
