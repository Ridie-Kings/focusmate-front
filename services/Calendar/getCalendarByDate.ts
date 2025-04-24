"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function getCalendarByDate({ date }: { date: string }): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.get(`calendar/${date}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error(`Error fetching calendar of ${date}:`, error.response?.data);
    return { success: false, res: error.response?.data };
  }
}
