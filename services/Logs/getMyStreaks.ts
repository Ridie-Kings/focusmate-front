"use server";
import { apiClient } from "../api";

export async function getMyStreaks(): Promise<{
  success: boolean;
  res: number;
}> {
  try {
    const res = await apiClient.get("user-logs/streak");

    return { success: true, res };
  } catch (error: any) {
    console.error("Error fetching streaks:", error);

    return { success: false, res: error.message };
  }
}
