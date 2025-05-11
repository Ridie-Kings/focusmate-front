"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { PromiseGetMyStats } from "@/interfaces/Dashboard/DashboardType";


export async function GetMyStats(): Promise<{
  success: boolean;
  data: PromiseGetMyStats;
}> {
  try {
    const token = await getToken();
    const res = await apiConnection.get(`dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error getting GetStatsBoardInfoUser:", error.response?.data);
    return { success: false, data: error.response };
  }
}
