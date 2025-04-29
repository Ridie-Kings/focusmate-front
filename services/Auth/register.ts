"use server";
import { AuthResponse } from "@/interfaces/Auth/AuthType";
import { apiConnection } from "../axiosConfig";
import { cookies } from "next/headers";

export async function register(
  prevState: any,
  formData: FormData
): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies();

    const userData = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      fullname: formData.get("fullname") as string,
      password: formData.get("password") as string,
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
    const response = await apiConnection.post("auth/register", userData);
    const { access_token, refresh_token } = response?.data;

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
        error.response?.data.message ||
        "An unexpected error occurred during registration.",
    };
  }
}

function testUserData(userData: {
  email: string;
  username: string;
  password: string;
  fullname: string;
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

  if (userData.username.length <= 3) {
    return {
      success: false,
      message: "The username must be at least 4 characters long.",
    };
  }

  if (userData.password !== userData.repeatPassword)
    return {
      success: false,
      message: "The passwords do not match.",
    };
}
