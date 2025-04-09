"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiConnection } from "./services/axiosConfig";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function getToken() {
  const existedCookies = await cookies();
  return existedCookies.get("session")?.value;
}

export async function updateSession(req: NextRequest) {
  const existedCookies = await cookies();
  const accessToken = await getToken();
  const refreshToken = existedCookies.get("session");
  const { pathname } = req.nextUrl;
  const publicPaths = new Set(["/login", "/register"]);

  if (!accessToken && refreshToken) await refreshSession(refreshToken);

  if (!pathname.includes(".")) {
    if (!accessToken && !refreshToken && !publicPaths.has(pathname)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    if (accessToken && refreshToken && publicPaths.has(pathname)) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }
}

export async function refreshSession(refreshToken: RequestCookie | undefined) {
  try {
    const existedCookies = await cookies();
    const res = await apiConnection.post("auth/refresh", { refreshToken });
    const newAccessToken = res?.data.accessToken;
    if (!newAccessToken) {
      console.error("Failed to refresh session: No access token returned");
      return undefined;
    }
    existedCookies.set("token", newAccessToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
      httpOnly: true,
    });
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing session:", error);
    return undefined;
  }
}

export async function logout() {
  const existedCookies = await cookies();
  const token = await getToken();

  const res = await apiConnection.post("auth/logout", {
    Authorization: `Bearer ${token}`,
  });

  existedCookies.set("token", "", {
    expires: new Date(0),
    path: "/",
    secure: true,
    httpOnly: true,
  });
  existedCookies.set("session", "", {
    expires: new Date(0),
    path: "/",
    secure: true,
    httpOnly: true,
  });
}
