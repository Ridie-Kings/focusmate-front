"use server";
import { apiClient } from "../api";
import { UserLogStats } from "@/interfaces/User/UserType";

export async function GetUserLogs(): Promise<{
  success: boolean;
  res: UserLogStats;
}> {
  try {
    const res = await apiClient.get(`user-logs/mystats`);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error get user logs:", error);

    return { success: false, res: error.message };
  }
}
