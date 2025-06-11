"use server";

import { apiClient } from "../api";

export async function softDeleteProfile(): Promise<{
  success: boolean;
  res: string;
}> {
  try {
    const res = await apiClient.delete("users/softDelete");

    console.log(res);

    return { success: true, res: "Cuenta eliminada correctamente" };
  } catch (error: any) {
    console.error("Error fetching user profile:", error);

    return { success: false, res: error.message };
  }
}
