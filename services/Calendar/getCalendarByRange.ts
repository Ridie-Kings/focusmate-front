"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function getCalendarByRange({
  firstDate,
  secondDate,
}: {
  firstDate: Date;
  secondDate: Date;
}): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.get(
      `calendar/${firstDate.toISOString().split("T")[0]}/${
        secondDate.toISOString().split("T")[0]
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error(`Error fetching calendar:`, error.response?.data);
    return { success: false, res: error.response?.data };
  }
}
