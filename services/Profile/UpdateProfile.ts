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
    return res.data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error.response.data.message);
    return null;
  }
}
