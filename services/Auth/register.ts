"use server";
import { AuthResponse } from "@/interfaces/Auth/AuthType";
import { apiClient } from "../api";
import { cookies } from "next/headers";

function generateUsername(fullname: string): string {
  const baseUsername = fullname
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "");

  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `${baseUsername}.${randomDigits}`;
}

export async function register(
  prevState: any,
  formData: FormData
): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies();

    const fullname = formData.get("fullname") as string;

    const userData = {
      email: formData.get("email") as string,
      fullname: fullname,
      password: formData.get("password") as string,
      username: generateUsername(fullname),
    };

    const testUser = testUserData({
      ...userData,
      repeatPassword: formData.get("repeat password") as string,
    });

    if (testUser && !testUser.success) {
      return {
        success: false,
        message: testUser?.message || "Errors in Inputs",
      };
    }
    const response = await apiClient.post("auth/register", userData);
    const { access_token, refresh_token } = response;

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
    return {
      success: false,
      message:
        error.message || "An unexpected error occurred during registration.",
    };
  }
}

function testUserData(userData: {
  email: string;
  password: string;
  fullname: string;
  username: string;
  repeatPassword: string;
}) {
  for (const [key, value] of Object.entries(userData)) {
    if (!value) {
      return {
        success: false,
        message: `The field "${key}" must be filled.`,
      };
    }
  }

  const password = userData.password!;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message:
        "La contraseña debe tener al menos 8 caracteres e incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (como `!@#$%^&*()_+-=[]{}|;:',.<>/?)",
    };
  }

  if (userData.password !== userData.repeatPassword)
    return {
      success: false,
      message: "The passwords do not match.",
    };

  return { success: true };
}
