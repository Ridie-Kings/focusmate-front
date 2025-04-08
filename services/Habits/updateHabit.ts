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
    const token = await getToken();

    const res = await apiConnection.patch("habits", habit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res.data };
  } catch (error: any) {
    console.error("Error fetching tasks:", error.response.data.message);
    return { success: false, res: error.response };
  }
}
