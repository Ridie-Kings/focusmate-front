import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiConnection } from "./services/axiosConfig";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function getToken() {
  const existedCookies = await cookies();
  const token = existedCookies.get("token");

  if (!token) {
    console.error("Token not found");
    return undefined;
  }
  return token;
}

export async function updateSession(req: NextRequest) {
  const existedCookies = await cookies();
  const accessToken = await getToken();
  const refreshToken = existedCookies.get("session");
  const { pathname } = req.nextUrl;
  const publicPaths = new Set(["/login", "/register"]);

  if (!accessToken && refreshToken) {
    await refreshSession(refreshToken);
  }

  if (!accessToken && refreshToken) await refreshSession(refreshToken);

  if (!pathname.includes(".")) {
    if (!accessToken && !refreshToken && !publicPaths.has(pathname)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
  }
  if (!pathname.includes(".")) {
    if (!accessToken && !refreshToken && !publicPaths.has(pathname)) {
      // return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    if (accessToken && refreshToken && publicPaths.has(pathname)) {
      // return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }
}

export async function refreshSession(refreshToken: RequestCookie | undefined) {
  if (!refreshToken) return;

  try {
    const res = await apiConnection.post("auth/refresh", {
      refreshToken: refreshToken.value,
    });
    const newAccessToken = res.data.accessToken;

    const existedCookies = await cookies();
    existedCookies.set("token", newAccessToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
      httpOnly: true,
    });
  } catch (error) {
    console.error("Error refreshing session:", error);
  }
  try {
    const existedCookies = await cookies();
    const res = await apiConnection.post("auth/refresh", { refreshToken });
    const newAccessToken = res.data.accessToken;
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

export async function logout(req: NextRequest) {
  const existedCookies = await cookies();
  const url = req.url;
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
  return NextResponse.redirect(new URL("/login", url));
}
