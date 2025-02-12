"use server";
import { apiConnection } from "../axiosConfig";
import { cookies } from "next/headers";

export async function login(prevState: any, formData: FormData) {
	try {
		const existedCookies = await cookies();
		const userData = {
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
		const res = await apiConnection.post("auth/login", userData);
		console.log(res);
		const accessToken = res.data.accessToken;
		const refreshToken = res.data.refreshToken;
		const softExpired = new Date(Date.now() + 1000 * 60 * 60 * 12);
		const hardExpired = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
		existedCookies.set("token", accessToken, {
			expires: softExpired,
			httpOnly: true,
		});
		existedCookies.set("session", refreshToken, {
			expires: hardExpired,
			httpOnly: true,
		});

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
