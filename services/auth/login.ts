import { LoginProps } from "@/interfaces/Auth/AuthType";
import { apiConnection } from "../axiosConfig";

export async function login({ email, password }: LoginProps) {
  try {
    const res = await apiConnection.post("auth/login", { email, password });
    return res.data;
  } catch (error: Error | any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to login");
    }
    throw new Error("Failed to login");
  }
}
