"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function getCalendarByDate({ date }: { date: Date }): Promise<{
  success: boolean;
  message: any;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.get(`calendar/${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: res.data };
  } catch (error: any) {
    console.error(
      `Error fetching calendar of ${date.toDateString()}:`,
      error.response.data
    );
    return { success: false, message: error.response.data };
  }
}
