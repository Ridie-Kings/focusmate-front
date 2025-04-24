"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function getCalendarByDate({ date }: { date: Date }): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const token = await getToken();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    
    const res = await apiConnection.get(`calendar/${formattedDate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error(
      `Error fetching calendar of ${date.toDateString()}:`,
      error.response?.data
    );
    return { success: false, res: error.response?.data };
  }
}
