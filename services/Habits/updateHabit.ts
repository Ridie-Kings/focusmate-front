"use server";

import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { HabitsType } from "@/interfaces/Habits/HabitsType";

export async function updateHabit({
  habit,
}: {
  habit: HabitsType | undefined;
}): Promise<{ success: boolean; res: any }> {
  try {
    if (!habit) {
      throw new Error("Habit is undefined");
    }

    const token = await getToken();

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await apiConnection.patch("habits", habit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res.data };
  } catch (error: any) {
    console.error(
      "Error updating habit:",
      error.response?.data?.message || error.message || "Unknown error"
    );

    return {
      success: false,
      res: error.response || { message: error.message || "Unknown error" },
    };
  }
}
