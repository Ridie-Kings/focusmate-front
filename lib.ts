"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiConnection } from "./services/axiosConfig";
import { getMyProfile } from "./services/Profile/getMyProfile";

/**
 * Obtiene el token de acceso desde las cookies
 * @returns Token de acceso o undefined
 */
export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
}

/**
 * Actualiza la sesión del usuario y maneja redirecciones
 * @param req Solicitud Next.js
 * @returns Respuesta de redirección o undefined
 */
export async function updateSession(
  req: NextRequest
): Promise<NextResponse | undefined> {
  const cookieStore = await cookies();
  const accessToken = await getToken();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const { pathname } = req.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicPaths = new Set(["/login", "/register"]);

  // Si hay token de refresco pero no de acceso, intentar renovar la sesión
  if (!accessToken && refreshToken) {
    const newToken = await refreshSession(refreshToken);
    // Si no se pudo obtener un nuevo token, redirigir a login
    if (!newToken && !publicPaths.has(pathname)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
  }

  // Verificación para rutas específicas
  if (pathname === "/statsboard") {
    try {
      const user = await getMyProfile();
      if (user?.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/404", req.nextUrl.origin));
      }
    } catch (error) {
      console.error("Error al verificar el perfil:", error);
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
  }

  // Si la ruta no es un recurso estático
  if (!pathname.includes(".")) {
    // Redirigir a login si intenta acceder a ruta protegida sin autenticación
    if (!accessToken && !refreshToken && !publicPaths.has(pathname)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    // Redirigir a home si intenta acceder a rutas públicas estando autenticado
    if (accessToken && publicPaths.has(pathname)) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return undefined;
}

/**
 * Refresca la sesión del usuario usando el refresh token
 * @param refreshToken Token de refresco
 * @returns Nuevo token de acceso o undefined
 */
export async function refreshSession(
  refreshToken: string
): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const response = await apiConnection.post("auth/refresh", { refreshToken });
    const newAccessToken = response?.data?.accessToken;

    if (!newAccessToken) {
      console.error("Error al refrescar sesión: No se recibió token de acceso");
      return undefined;
    }

    // Configurar la nueva cookie con el token actualizado
    cookieStore.set("access_token", newAccessToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 horas
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Seguro en producción
      path: "/", // Asegurar que la cookie está disponible en toda la app
      sameSite: "strict", // Protección contra CSRF
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

/**
 * Cierra la sesión del usuario
 * @returns true si la operación fue exitosa, false en caso contrario
 */
export async function logout(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = await getToken();

    if (token) {
      try {
        // Descomentar cuando el endpoint de logout esté listo
        await apiConnection.post("auth/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (logoutError) {
        console.warn("Error en el endpoint de logout:", logoutError);
        // Continuar con el proceso de logout local aunque falle el endpoint
      }
    }

    // Eliminar cookies de sesión
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
}
