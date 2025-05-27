"use server";

import { apiClient } from "../../lib/api";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

export async function getMyProfile(): Promise<ProfileType | null> {
  try {
    const res = await apiClient.get("profile/@me");

    return res?.data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
    return error;
  }
}
