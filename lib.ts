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
	const accessToken = getToken();
	const refreshToken = existedCookies.get("session");
	const url = req.url;
	const { pathname } = req.nextUrl;
	const publicPaths = new Set(["/login", "/register"]);
	if (!accessToken && refreshToken) refreshSession(refreshToken);

	if (!accessToken && !refreshToken && !publicPaths.has(pathname)) {
		return NextResponse.redirect("/login");
	}
}

export async function refreshSession(refreshToken: RequestCookie | undefined) {
	const existedCookies = await cookies();
	const res = await apiConnection.post("auth/refresh", refreshToken);
	const newAccessToken = res.data.accessToken;
	existedCookies.set("token", newAccessToken, {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
		httpOnly: true,
	});
}

export async function logout() {
	const existedCookies = await cookies();
	existedCookies.set("token", "", { expires: new Date(0) });
	existedCookies.set("session", "", { expires: new Date(0) });
	return NextResponse.redirect("/login");
}
