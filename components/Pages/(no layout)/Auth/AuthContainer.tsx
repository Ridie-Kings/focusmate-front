"use client";

import Image from "next/image";
import { AUTH_CONFIG } from "@/config/AuthConfig";
import { register } from "@/services/Auth/register";
import { useActionState, useEffect, useCallback, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Reusable/Button";
import LinkButtons from "./LinkButtons";
import login from "@/services/Auth/login";
import Input from "@/components/Reusable/Input";

const REDIRECT_PATHS: Record<"login" | "register", string> = {
  login: "/",
  register: "/login",
};

export const AuthContainer = ({ type }: { type: "login" | "register" }) => {
  const config = AUTH_CONFIG[type];
  const [error, setError] = useState<string>("");
  const handleAuth = type === "login" ? login : register;

  const [state, action] = useActionState(handleAuth, {
    success: false,
    message: "",
  });

  const handleError = useCallback((message: string) => {
    setError(
      message === "Invalid credentials"
        ? "El email o/y la contraseña esta mal"
        : message
    );
    console.error("Authentication Error:", message);
  }, []);

  useEffect(() => {
    if (state.message === "") return;
    console.log(state.success);

    if (state.success) redirect(REDIRECT_PATHS[type]);
    else handleError(state.message);
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
            <Input
              key={index}
              name={field.name}
              field={field.type === "password" ? 3 : 2}
              label={field.label}
              placeholder={field.placeholder}
              state=""
              icon={field.icon}
            />
          ))}
          <Link href="#" className="underline">
            ¿Olvidaste tu contraseña?
          </Link>
          {error && <div className="text-red-500 text-sm">{error}</div>}

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
