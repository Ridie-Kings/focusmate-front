"use server";
import { AuthResponse } from "@/interfaces/Auth/AuthType";
import { apiConnection } from "../axiosConfig";
import { cookies } from "next/headers";

export default async function login(
  prevState: any,
  formData: FormData
): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies();
    const userData: Record<string, string> = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    for (const [key, value] of Object.entries(userData)) {
      if (!value.trim()) {
        return {
          success: false,
          message: `${key} field must be filled`,
        };
      }
    }

    const res = await apiConnection.post("auth/login", userData);

    console.log(res);

    const { access_token, refresh_token } = res?.data;

    const softExpired = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12h
    const hardExpired = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7j

    cookieStore.set("token", access_token, {
      expires: softExpired,
      httpOnly: true,
      path: "/",
    });

    cookieStore.set("session", refresh_token, {
      expires: hardExpired,
      httpOnly: true,
      path: "/",
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error: any) {
    // console.log(error.response);

    return {
      success: false,
      message: error.response?.data || "Unexpected error during login",
    };
  }
}
