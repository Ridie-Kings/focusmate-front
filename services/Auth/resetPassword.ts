"use server";
import { apiClient } from "../api";

export async function resetPassword({
  resetCode,
  newPassword,
  email,
}: {
  resetCode: string;
  newPassword: string;
  email: string;
}): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const res = await apiClient.post("auth/reset-password", {
      resetCode,
      newPassword,
      email,
    });

    return { success: true, res };
  } catch (error: any) {
    console.error("Error reset password:", error);

    return { success: false, res: error.message };
  }
}
