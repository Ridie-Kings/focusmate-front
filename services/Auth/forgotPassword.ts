"use server";
import { apiClient } from "../api";

export async function forgotPassword({ email }: { email: string }): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const res = await apiClient.post("auth/forgot-password", { email });

    return { success: true, res };
  } catch (error: any) {
    console.error("Error forgot password:", error);

    return { success: false, res: error.message };
  }
}
