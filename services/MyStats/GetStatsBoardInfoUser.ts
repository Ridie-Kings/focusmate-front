"use server";
import { apiClient } from "../api";

export async function GetStatsBoardInfoUser({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; data: any }> {
  try {
    const res = await apiClient.get(`dashboard/user/${id}`);

    return { success: true, data: res };
  } catch (error: any) {
    console.error("Error getting GetStatsBoardInfoUser:", error);

    return { success: false, data: error.message };
  }
}
