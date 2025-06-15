"use server";
import { apiClient } from "../api";

export async function GetMyStatsMonth(): Promise<{
  success: boolean;
  data: any;
}> {
  try {
    const res = await apiClient.get(`user-logs/tasks/1-2025/6-2025`);

    return { success: true, data: res };
  } catch (error: any) {
    console.error("Error gettin stats of user:", error);

    return { success: false, data: error.message };
  }
}
