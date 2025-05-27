"use server";
import { apiClient } from "../../lib/api";

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
    const res = await apiClient.post("auth/reset-password", { email });

    return { success: true, res.message };
  } catch (error: any) {
    console.error("Error creating calendar event:", error.message);
    return { success: false, res: error.message.message[0] };
  }
}
