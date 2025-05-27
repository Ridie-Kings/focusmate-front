"use server";
import { apiClient } from "../../lib/api";
import { HabitsType } from "@/interfaces/Habits/HabitsType";

export async function createHabit({
  habit,
}: {
  habit: { name: string; description: string; frequency: string; type: string };
}): Promise<{ success: boolean; res: HabitsType | string }> {
  try {
    const res = await apiClient.post("habits", habit);

    if (!res?.data) {
      return {
        success: false,
        res: "Error al crear el hábito: Respuesta vacía",
      };
    }

    return { success: true, res: res };
  } catch (error: any) {
    console.log("Error creating habit:", error.message);
    if (error?.message) {
      return { success: false, res: error.message.message };
    }

    if (error.message) {
      return { success: false, res: error.message.message };
    }

    return { success: false, res: "Error inesperado al crear el hábito" };
  }
}
