"use server";
import { apiClient } from "../api";

export async function GetGlobalInfo(): Promise<{
  success: boolean;
  data: any;
}> {
  try {
    const res = await apiClient.get(`dashboard/global`);

    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error gettin global info:", error.message);
    return { success: false, data: error };
  }
}
