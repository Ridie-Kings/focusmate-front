"use server";
import { apiClient } from "../api";
import { UserType } from "@/interfaces/User/UserType";

export async function GetAllUsers(): Promise<{
  success: boolean;
  res: UserType[];
}> {
  try {
    const res = await apiClient.get(`users`);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error get all user profile:", error);

    return { success: false, res: error.message };
  }
}
