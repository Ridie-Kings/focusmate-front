import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function getAllCategories(): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.get("calendar/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error("Error fetching categories:", error.response?.data);
    return { success: false, res: error.response?.data };
  }
}
