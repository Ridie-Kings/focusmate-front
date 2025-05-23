"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function UpdateUser({
  id,
  user,
}: {
  id: string;
  user: any;
}): Promise<{ success: boolean; data: any }> {
  try {
    const token = await getToken();
    const res = await apiConnection.patch(`users/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error updating user:", error.response?.data);
    return { success: false, data: error.response };
  }
}
