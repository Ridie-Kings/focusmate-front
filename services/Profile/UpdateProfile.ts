"use server";

import { apiClient } from "../../lib/api";

export async function updateProfile({
  id,
  profile,
}: {
  id: string;
  profile: any;
}): Promise<{ success: boolean; data: any }> {
  try {
    const res = await apiClient.patch(`profile/${id}`, profile);
    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error updating user profile:", error.message);
    return { success: false, data: "Error updating user profile" };
  }
}
