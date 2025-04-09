"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { HabitsType } from "@/interfaces/Habits/HabitsType";

export async function createHabit({
  habit,
}: {
  habit: { name: string; description: string; frequency: string };
}): Promise<{ success: boolean; res: HabitsType }> {
  try {
    const token = await getToken();

    const res = await apiConnection.post("habits", habit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error("Error fetching tasks:", error.response?.data.message);
    return { success: false, res: error.response };
  }
}
