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
  const [formData, setFormData] = useState<Record<string, string>>({});
  const handleAuth = type === "login" ? login : register;

  // Récupérer les données sauvegardées au chargement du composant
  useEffect(() => {
    const savedData = localStorage.getItem(`auth_${type}_data`);
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing saved form data:", e);
        localStorage.removeItem(`auth_${type}_data`);
      }
    }
  }, [type]);

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

    if (state.success) {
      // Effacer les données stockées en cas de succès
      localStorage.removeItem(`auth_${type}_data`);
      redirect(REDIRECT_PATHS[type]);
    } else {
      handleError(state.message);
    }
  }, [state, type, handleError]);

  // Gérer les changements dans les champs de formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // Sauvegarder dans localStorage après chaque modification
    localStorage.setItem(`auth_${type}_data`, JSON.stringify(updatedData));
  };

  // Création d'un FormData pour la soumission
  const handleSubmit = (formData: FormData) => {
    // Ajouter les valeurs du state au FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (!formData.has(key)) {
        formData.append(key, value);
      }
    });

    return action(formData);
  };

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

        <form action={handleSubmit} className="flex flex-col gap-7 w-full">
          {config.fields.map((field, index) => (
            <Input
              key={index}
              name={field.name}
              field={field.type === "password" ? 3 : 2}
              label={field.label}
              placeholder={field.placeholder}
              state=""
              icon={field.icon}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
            />
          ))}

          {type === "login" && (
            <Link href="#" className="underline">
              ¿Olvidaste tu contraseña?
            </Link>
          )}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex flex-col gap-4">
            {type === "login" ? (
              <>
                <Button size="large" type="submit" button="primary">
                  Iniciar Sesión
                </Button>
                <Link href="/register">
                  <Button size="large" button="secondary" type="button">
                    Registrarse
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button size="large" type="submit" button="primary">
                  Registrarse
                </Button>
                <Link href="/login">
                  <Button size="large" button="secondary" type="button">
                    Ya tengo una cuenta
                  </Button>
                </Link>
              </>
            )}
          </div>

          {type === "login" && <LinkButtons />}
        </form>
      </div>
    </section>
  );
};
