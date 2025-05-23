"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function addTaskToCalendar({ _id }: { _id: string }): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.patch(
      `calendar/addtask/${_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error("Error creating calendar event:", error.response.data);
    return { success: false, res: error.response.data };
  }
}
