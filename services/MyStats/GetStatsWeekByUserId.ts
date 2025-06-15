"use server";

import { apiClient } from "../api";

export async function GetStatsWeekByUserId({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; data: any }> {
  try {
    const res = await apiClient.get(`/dashboard/stats/week?userId=${id}`);

    return { success: true, data: res };
  } catch (error: any) {
    console.error("Error gettin stats of user:", error);

    return { success: false, data: error.message };
  }
}
