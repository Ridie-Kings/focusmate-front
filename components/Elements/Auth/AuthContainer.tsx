"use client";
import Image from "next/image";
import { InputField } from "./InputField";
import { AuthHeader } from "./AuthHeader";
import { AUTH_CONFIG } from "@/config/AuthConfig";
import { register } from "@/services/auth/register";
import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import { login } from "@/services/auth/login";

export const AuthContainer = ({ type }: { type: "login" | "register" }) => {
	const config = AUTH_CONFIG[type];
	const typeOfPage = type === "login" ? login : register;

	const [state, action, error] = useActionState(typeOfPage, {
		success: undefined,
		message: "",
	});

	const REDIRECT_PATHS: Record<"login" | "register", string> = {
		login: "/",
		register: "/login",
	};

	const handleError = (message: string) => {
		console.error(message);
		//TODO: Implement a better way to show errors
	};

	useEffect(() => {
		if (state.success === undefined) return;

		if (state.success) {
			redirect(REDIRECT_PATHS[type]);
		} else {
			handleError(state.message);
		}
	}, [state]); // TODO: create custom file for this to split logic & presentation

	return (
		<section className="w-[45%] flex-1 flex flex-col items-center justify-center gap-10 px-5 ">
			{type === "login" && (
				<Image
					src="/images/logoLogin.png"
					width={75}
					height={75}
					alt="logo"
					priority
				/>
			)}

			<div className="flex flex-col gap-2 items-start w-full">
				<h1 className="text-4xl">{config.title}</h1>
				<p className="text-gray-100">{config.description}</p>
			</div>
			<AuthHeader type={type} />

			<form action={action} className="flex flex-col gap-7 w-full">
				{config.fields.map((field, index) => (
					<InputField key={index} {...field} />
				))}

				<button
					type="submit"
					className="w-full bg-black-100 py-2 rounded-lg text-white-100"
				>
					{type === "login" ? "Iniciar Sesión" : "Registrarse"}
				</button>

				{config.otherElements}
			</form>
		</section>
	);
};
