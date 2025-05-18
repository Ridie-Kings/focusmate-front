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
    if (!res.data.success) throw new Error(res.data.res);

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error("Error creating calendar event:", error.response.data);
    return { success: false, res: error.response.data };
  }
}
