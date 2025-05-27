"use server";
import { apiClient } from "../../lib/api";
import { PromiseGetMyStats } from "@/interfaces/Dashboard/DashboardType";

export async function GetMyStats(): Promise<{
  success: boolean;
  data: PromiseGetMyStats;
}> {
  try {
    const res = await apiClient.get(`dashboard`);

    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error getting GetStatsBoardInfoUser:", error.message);
    return { success: false, data: error };
  }
}
