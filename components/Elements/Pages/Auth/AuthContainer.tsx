"use client";

import Image from "next/image";
import { InputField } from "./InputField";
import { AUTH_CONFIG } from "@/config/AuthConfig";
import { register } from "@/services/Auth/register";
import { login } from "@/services/Auth/login";
import { useActionState, useEffect, useCallback } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Reusable/Button";
import LinkButtons from "./LinkButtons";

const REDIRECT_PATHS: Record<"login" | "register", string> = {
  login: "/",
  register: "/login",
};

export const AuthContainer = ({ type }: { type: "login" | "register" }) => {
  const config = AUTH_CONFIG[type];
  const handleAuth = type === "login" ? login : register;

  const [state, action] = useActionState(handleAuth, {
    success: false,
    message: "",
  });

  const handleError = useCallback((message: string) => {
    console.error("Authentication Error:", message);
    // TODO: Implement a user-friendly error display
  }, []);

  useEffect(() => {
    if (state.message === "") return;
    console.log(state.success);

    state.success ? redirect(REDIRECT_PATHS[type]) : handleError(state.message);
  }, [state, type, handleError]);

  return (
    <section className="w-[45%] flex-1 flex flex-col items-center justify-center gap-10 px-6 py-8">
      {type === "login" && (
        <Image
          src="/images/logoLogin.png"
          width={75}
          height={75}
          alt="Logo"
          priority
        />
      )}
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-4xl leading-9">{config.title}</h1>
          <p className="text-[#32363F] text-xl leading-6">
            {config.description}
          </p>
        </div>

        <form action={action} className="flex flex-col gap-7 w-full">
          {config.fields.map((field, index) => (
            <InputField key={field.name || index} {...field} />
          ))}
          <Link href="#" className="underline">
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="flex flex-col gap-4">
            <Button type="submit" button="primary">
              Iniciar Sesión
            </Button>
            <Button type="submit" button="secondary">
              Registrarse
            </Button>
          </div>

          <LinkButtons />
        </form>
      </div>
    </section>
  );
};
