"use server";
import { apiClient } from "../api";
import { HabitsType } from "@/interfaces/Habits/HabitsType";

export async function createHabit({
  habit,
}: {
  habit: { name: string; description: string; frequency: string; type: string };
}): Promise<{ success: boolean; res: HabitsType | string }> {
  try {
    const res = await apiClient.post("habits", habit);

    if (!res) {
      return {
        success: false,
        res: "Error al crear el hábito: Respuesta vacía",
      };
    }

    return { success: true, res: res };
  } catch (error: any) {
    console.error("Error creating habit:", error);

    return { success: false, res: error.message };
  }
}
