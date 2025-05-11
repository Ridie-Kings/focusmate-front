"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { HabitsType } from "@/interfaces/Habits/HabitsType";

export async function createHabit({
  habit,
}: {
  habit: { name: string; description: string; frequency: string; type: string };
}): Promise<{ success: boolean; res: HabitsType | string }> {
  try {
    const token = await getToken();

    const res = await apiConnection.post("habits", habit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res?.data) {
      return {
        success: false,
        res: "Error al crear el hábito: Respuesta vacía",
      };
    }

    return { success: true, res: res.data };
  } catch (error: any) {
    console.log("Error creating habit:", error);
    if (error.response?.data?.message) {
      return { success: false, res: error.response.data.message };
    }

    if (error.message) {
      return { success: false, res: error.message };
    }

    return { success: false, res: "Error inesperado al crear el hábito" };
  }
}
