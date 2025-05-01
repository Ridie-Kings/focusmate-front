"use server";
import { apiConnection } from "../axiosConfig";
import { cookies } from "next/headers";

export default async function google() {
  try {
    const cookieStore = await cookies();

    const res = await apiConnection.post("auth/google");

    const { access_token, refresh_token } = res?.data;

    // const softExpired = new Date(Date.now() + 1000 * 60 * 60 * 12);
    // const hardExpired = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    // cookieStore.set("access_token", access_token, {
    //   expires: softExpired,
    //   httpOnly: true,
    //   path: "/",
    // });

    // cookieStore.set("refresh_token", refresh_token, {
    //   expires: hardExpired,
    //   httpOnly: true,
    //   path: "/",
    // });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data.message || "Unexpected error during login",
    };
  }
}
