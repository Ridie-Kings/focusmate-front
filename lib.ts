"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "./services/api";

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
}

export async function updateSession(
  req: NextRequest
): Promise<NextResponse | undefined> {
  const cookieStore = await cookies();
  const accessToken = await getToken();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const { pathname } = req.nextUrl;

  const publicPaths = new Set([
    "/login",
    "/register",
    "/",
    "/passwordrecovery",
  ]);
  const authOnlyPaths = new Set(["/login", "/register"]);

  if (pathname === "/") {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (!accessToken && refreshToken) {
    const newToken = await refreshSession(refreshToken);
    if (!newToken && !publicPaths.has(pathname)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
  }

  if (!pathname.includes(".")) {
    if (!accessToken && !refreshToken && !publicPaths.has(pathname)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    if ((accessToken || refreshToken) && authOnlyPaths.has(pathname)) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  let locale = req.cookies.get("NEXT_LOCALE")?.value;

  if (!locale) {
    const acceptLanguage = req.headers.get("accept-language");
    locale = acceptLanguage?.split(",")[0].split("-")[0] || "es";

    const finalLocale = locale === "en" || locale === "es" ? locale : "es";

    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", finalLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  return undefined;
}

export async function refreshSession(
  refreshToken: string
): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const response = await apiClient.post("auth/refresh", { refreshToken });
    const newAccessToken = response?.data?.accessToken;

    if (!newAccessToken) {
      console.error("Error al refrescar sesión: No se recibió token de acceso");
      return undefined;
    }

    cookieStore.set("access_token", newAccessToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    return newAccessToken;
  } catch (error) {
    console.error("Error al refrescar la sesión:", error);
    // Eliminar cookies inválidas
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return undefined;
  }
}

export async function logout(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    // const token = await getToken();

    // if (token) {
    //   try {
    //     // Descomentar cuando el endpoint de logout esté listo
    //     await apiConnection.post("auth/logout", null, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //   } catch (logoutError) {
    //     console.warn("Error en el endpoint de logout:", logoutError);
    //     // Continuar con el proceso de logout local aunque falle el endpoint
    //   }
    // }

    // Eliminar cookies de sesión
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
}
