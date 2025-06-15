"use server";

import { apiClient } from "../api";

export async function softDeleteProfile(): Promise<{
  success: boolean;
  res: string;
}> {
  try {
    await apiClient.delete("users/delete/soft");

    return { success: true, res: "Cuenta eliminada correctamente" };
  } catch (error: any) {
    console.error("Error deleting:", error);

    return { success: false, res: error.message };
  }
}
