"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

export async function getMyProfile(): Promise<ProfileType | null> {
  try {
    const token = await getToken();

    const res = await apiConnection.get("profile/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    return error;
  }
}
