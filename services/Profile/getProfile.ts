"use server";

import { apiClient } from "@/lib/api";

export async function getProfile({ slug }: { slug: string }) {
  try {
    const res = await apiClient.get(`users/${slug}`);
    return res?.data;
  } catch (error: any) {
    console.error(`Error fetching user profile ${slug}:`, error.message);
    return null;
  }
}
