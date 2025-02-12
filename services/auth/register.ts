import { RegisterProps } from "@/interfaces/Auth/AuthType";
import { apiConnection } from "../axiosConfig";

export async function register({
  fullName,
  username,
  email,
  password,
}: RegisterProps) {
  try {
    const res = await apiConnection.post("auth/register", {
      fullName,
      username,
      email,
      password,
    });
    return res.data;
  } catch (error: Error | any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to register");
    }
    throw new Error("Failed to register");
  }
}
