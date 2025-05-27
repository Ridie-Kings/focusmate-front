"use server";
import { apiClient } from "../../lib/api";

export async function GetMyStatsWeek(): Promise<{
  success: boolean;
  data: any;
}> {
  try {
    const res = await apiClient.get(`/dashboard/stats/week`);

    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error gettin stats of user:", error.message);
    return { success: false, data: error };
  }
}
