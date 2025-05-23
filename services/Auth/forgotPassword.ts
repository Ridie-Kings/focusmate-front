"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function forgotPassword({ email }: { email: string }): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.post(
      `auth/forgot-password`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error("Error forgot password:", error.response.data);
    return { success: false, res: error.response.data };
  }
}
