"use client";

import { useActionState, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AUTH_CONFIG } from "@/config/AuthConfig";
import { register } from "@/services/Auth/register";
import LinkButtons from "./LinkButtons";
import login from "@/services/Auth/login";
import Input from "@/components/Reusable/Input";

import RenderForgotPassword from "./AuthContainer/RenderForgotPassword";
import RenderActionLinks from "./AuthContainer/RenderActionLinks";
import RenderActionButton from "./AuthContainer/RenderActionButton";

const REDIRECT_PATHS = {
  login: "/",
  register: "/login",
};

export const AuthContainer = ({ type }: { type: keyof typeof AUTH_CONFIG }) => {
  const config = AUTH_CONFIG[type];
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const handleAuth = type === "login" ? login : register;
  const storageKey = `auth_${type}_data`;
  const router = useRouter();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData: Record<string, string>) => {
        const updatedData = { ...prevData, [name]: value };
        localStorage.setItem(storageKey, JSON.stringify(updatedData));
        return updatedData;
      });
    },
    [storageKey]
  );

  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
          setFormData(JSON.parse(savedData));
        }
      } catch (e) {
        console.error("Erreur lors du chargement des données:", e);
        localStorage.removeItem(storageKey);
      }
    };

    loadSavedData();
  }, [storageKey]);

  const [state, action] = useActionState(handleAuth, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      localStorage.removeItem(storageKey);
      router.push(REDIRECT_PATHS[type]);
    } else {
      setError(state.message);
    }
  }, [state, type, storageKey]);

  const handleSubmit = useCallback(
    (formData: FormData) => {
      const formDataObject: Record<string, string> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value.toString();
      });
      return action(formData);
    },
    [action]
  );

  return (
    <section className="w-full md:w-[45%] flex-1 flex flex-col items-center justify-center gap-10 px-4 md:px-6 py-8">
      <div className="flex flex-col w-full items-center text-primary-500">
        <img src={"/images/logoBlack.png"} width={72} height={72} alt="logo" />
        <p className="text-4xl font-medium">SherApp</p>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 w-full text-primary-500">
          <h1 className="text-3xl md:text-5xl leading-9">{config.title}</h1>
          <p>{config.description}</p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-7 w-full">
          {config.fields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              field={
                field.type === "password" ? 3 : field.type === "email" ? 2 : 1
              }
              label={field.label}
              placeholder={field.placeholder}
              state=""
              icon={field.icon}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
            />
          ))}

          {type === "login" && (
            <div className="flex flex-col md:flex-row gap-2 md:justify-between items-start w-full">
              {RenderForgotPassword({ type })}
              {RenderActionLinks({ type })}
            </div>
          )}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex flex-col gap-4">
            {type === "login" ? (
              RenderActionButton({ type })
            ) : (
              <>
                {RenderActionLinks({ type })}
                {RenderActionButton({ type })}
              </>
            )}
          </div>

          {type === "login" && <LinkButtons />}
        </form>
      </div>
    </section>
  );
};
