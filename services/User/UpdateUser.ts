"use server";

import { apiClient } from "../api";

export async function UpdateUser({
  id,
  user,
}: {
  id: string;
  user: any;
}): Promise<{ success: boolean; data: any }> {
  try {
    const res = await apiClient.patch(`users/${id}`, user);

    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    return { success: false, data: error };
  }
}
