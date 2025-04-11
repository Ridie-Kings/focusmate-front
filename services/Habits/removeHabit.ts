"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function removeHabit({
  _id,
}: {
  _id: string;
}): Promise<{ success: boolean; res: any }> {
  try {
    const token = await getToken();

    const res = await apiConnection.delete(`habits/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error("Error deleting habit:", error.response?.data);
    return { success: false, res: error.response };
  }
}
