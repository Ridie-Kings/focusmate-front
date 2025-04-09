import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function getProfile({ slug }: { slug: string }) {
  try {
    const token = await getToken();
    const res = await apiConnection.get(`users/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error: any) {
    console.error(`Error fetching user profile ${slug}:`, error.response?.data);
    return null;
  }
}
