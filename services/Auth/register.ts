"use server";
import { AuthResponse } from "@/interfaces/Auth/AuthType";
import { apiConnection } from "../axiosConfig";

export async function register(
  prevState: any,
  formData: FormData
): Promise<AuthResponse> {
  try {
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

    return {
      success: true,
      message: response?.data || "Registration successful",
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data ||
        error.message ||
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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$#.!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message:
        "The password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
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
