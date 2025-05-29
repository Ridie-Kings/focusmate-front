"use server";

import { apiClient } from "../api";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

export async function getMyProfile(): Promise<{
  success: boolean;
  res: ProfileType | null;
}> {
  try {
    const res = await apiClient.get("profile/@me");

    return { success: true, res };
  } catch (error: any) {
    console.error("Error fetching user profile:", error);

    return { success: false, res: error.message };
  }
}
