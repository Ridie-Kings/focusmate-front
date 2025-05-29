"use server";

import { apiClient } from "../api";

export async function UpdateUser({
  id,
  user,
}: {
  id: string;
  user: any;
}): Promise<{ success: boolean; res: any }> {
  try {
    const res = await apiClient.patch(`users/${id}`, user);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error updating user:", error);

    return { success: false, res: error.message };
  }
}
