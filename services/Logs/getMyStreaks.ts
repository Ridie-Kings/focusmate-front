"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function getMyStreaks(): Promise<{
  success: boolean;
  res: number;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.get("user-logs/streak", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error("Error fetching tasks:", error.response?.data);
    return { success: false, res: error.response?.data };
  }
}
