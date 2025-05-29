"use server";
import { apiClient } from "../api";

export async function GetGlobalInfo(): Promise<{
  success: boolean;
  data: any;
}> {
  try {
    const res = await apiClient.get(`dashboard/global`);

    return { success: true, data: res };
  } catch (error: any) {
    console.error("Error getting global info:", error);

    return { success: false, data: error.message };
  }
}
