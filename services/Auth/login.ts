"use server";
import { AuthResponse } from "@/interfaces/Auth/AuthType";
import { apiClient } from "../api";
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

    const res = await apiClient.post("auth/login", userData);

    const { access_token, refresh_token } = res;

    const softExpired = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12h
    const hardExpired = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7j

    cookieStore.set("access_token", access_token, {
      expires: softExpired,
      httpOnly: true,
      path: "/",
    });

    cookieStore.set("refresh_token", refresh_token, {
      expires: hardExpired,
      httpOnly: true,
      path: "/",
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error: any) {
    console.log("error login", error);
    return {
      success: false,
      message: error.message || "Unexpected error during login",
    };
  }
}
