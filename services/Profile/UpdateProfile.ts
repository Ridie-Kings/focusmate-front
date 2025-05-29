"use server";

import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { apiClient } from "../api";

export async function updateProfile({
  id,
  profile,
}: {
  id: string;
  profile: any;
}): Promise<{ success: boolean; res: ProfileType | null }> {
  try {
    const res = await apiClient.patch(`profile/${id}`, profile);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error updating user profile:", error);

    return { success: false, res: error.message };
  }
}
