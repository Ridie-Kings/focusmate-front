"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function updateProfile({
  id,
  profile,
}: {
  id: string;
  profile: any;
}): Promise<{ success: boolean; data: any }> {

  try {
    const token = await getToken();
    const res = await apiConnection.patch(`profile/${id}`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: res?.data };
  } catch (error: any) {
    console.error("Error updating user profile:", error.response?.data);
    return { success: false, data: "Error updating user profile" };
  }
}
