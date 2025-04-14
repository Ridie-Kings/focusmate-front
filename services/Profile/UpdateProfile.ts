"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function updateProfile({ id }: { id: string }) {
  try {
    const token = await getToken();
    const res = await apiConnection.get(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error: any) {
    console.error("Error updating user profile:", error.response?.data);
    return null;
  }
}
