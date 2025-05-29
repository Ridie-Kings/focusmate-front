"use server";
import { apiClient } from "../api";

export async function getAllCategories(): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const res = await apiClient.get("calendar/all-categories");

    return { success: true, res };
  } catch (error: any) {
    console.error("Error fetching categories:", error);

    return { success: false, res: error.message };
  }
}
