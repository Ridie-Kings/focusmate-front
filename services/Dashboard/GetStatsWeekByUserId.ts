"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function GetStatsWeekByUserId({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; data: any }> {
  try {
    const token = await getToken();
    const res = await apiConnection.get(`/dashboard/stats/week?userId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error gettin stats of user:", error.response?.data);
    return { success: false, data: error.response };
  }
}
