"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function GetStatsBoardInfoUser({
  id,
}: {
  id: string;
}): Promise<{ success: boolean; data: any }> {
  try {
    const token = await getToken();
    const res = await apiConnection.get(`dashboard/user/${id}`, {
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
