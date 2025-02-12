import { apiConnection } from "../axiosConfig";

export async function register(prevState: any, formData: FormData) {
  try {
    const userData = {
      fullname: formData.get("fullname"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    for (const key of Object.keys(userData) as (keyof typeof userData)[]) {
      if (userData[key] === "") {
        return {
          success: false,
          message: `${userData[key]} field must be filled`,
        };
      }
    }
    const res = await apiConnection.post("auth/register", userData);
    return {
      success: true,
      message: res.data,
    };
  } catch (error: Error | any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.error || "Failed to register",
      };
    }
    return {
      success: false,
      message: "Unexpected error through register",
    };
  }
}
