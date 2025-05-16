"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function GetGlobalInfo(): Promise<{
  success: boolean;
  data: any;
}> {
  try {
    const token = await getToken();
    const res = await apiConnection.get(`dashboard/global`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error gettin global info:", error.response?.data);
    return { success: false, data: error.response.data };
  }
}
