"use server";

import { apiClient } from "../api";

export async function updateHabit({
  habit,
  _id,
}: {
  habit: any;
  _id: string;
}): Promise<{ success: boolean; res: any }> {
  try {
    const res = await apiClient.patch(`habits/${_id}`, habit);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error updating habit:", error);

    return {
      success: false,
      res: error.message,
    };
  }
}
