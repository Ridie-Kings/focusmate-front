"use server";
import { apiClient } from "../../lib/api";

export async function GetStatsBoardInfoUser({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; data: any }> {
  try {
    const res = await apiClient.get(`dashboard/user/${id}`);

    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error getting GetStatsBoardInfoUser:", error.message);
    return { success: false, data: error };
  }
}
