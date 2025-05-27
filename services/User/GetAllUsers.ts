"use server";
import { apiClient } from "../api";

export async function GetAllUsers(): Promise<{
  success: boolean;
  data: any;
}> {
  try {
    const res = await apiClient.get(`users`);

    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error get all user profile:", error.message);
    return { success: false, data: error };
  }
}
