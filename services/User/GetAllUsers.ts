"use server";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { apiClient } from "../api";

export async function GetAllUsers(): Promise<{
  success: boolean;
  res: ProfileType[];
}> {
  try {
    const res = await apiClient.get(`users`);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error get all user profile:", error);

    return { success: false, res: error.message };
  }
}
