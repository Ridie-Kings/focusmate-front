"use server";

import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { apiClient } from "@/services/api";

export async function getProfile({ slug }: { slug: string }): Promise<{
  success: boolean;
  res: ProfileType | null;
}> {
  try {
    const res = await apiClient.get(`users/${slug}`);

    return { success: true, res };
  } catch (error: any) {
    console.error(`Error fetching user profile ${slug}:`, error);

    return { success: false, res: error.message };
  }
}
