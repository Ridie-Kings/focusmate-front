"use server";

import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function updateHabit({
  habit,
  _id,
}: {
  habit: any;
  _id: string;
}): Promise<{ success: boolean; res: any }> {
  try {
    const token = await getToken();

    const res = await apiConnection.patch(`habits/${_id}`, habit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error(
      "Error updating habit:",
      error.response?.data || error.message || "Unknown error"
    );

    return {
      success: false,
      res: error.response || { message: error.message || "Unknown error" },
    };
  }
}
