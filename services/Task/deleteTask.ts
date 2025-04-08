"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function deleteTask({ _id }: { _id: string }): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.delete(`tasks/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: res.data };
  } catch (error: any) {
    console.error(
      "Error deleting task:",
      error.response?.data || error.response || error
    );
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Unknown error",
    };
  }
}
