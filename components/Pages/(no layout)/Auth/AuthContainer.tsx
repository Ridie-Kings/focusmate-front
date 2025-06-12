"use client";

import { useActionState, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { AUTH_CONFIG } from "@/config/AuthConfig";
import { register } from "@/services/Auth/register";
import login from "@/services/Auth/login";
import Input from "@/components/Reusable/Input";

import RenderForgotPassword from "./AuthContainer/RenderForgotPassword";
import RenderActionLinks from "./AuthContainer/RenderActionLinks";
import RenderActionButton from "./AuthContainer/RenderActionButton";
import GreenLogo from "@/components/Elements/Svg/Logos/GreenLogo";
import LinkButtons from "./LinkButtons";
import LanguageSwitcher from "@/components/Elements/General/LanguageSwitcher";

export const AuthContainer = ({ type }: { type: keyof typeof AUTH_CONFIG }) => {
  const t = useTranslations("Auth");
  const commonT = useTranslations("Common");

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
    router.refresh();
  }, [storageKey]);

  const [state, action, isLoading] = useActionState(handleAuth, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      localStorage.removeItem(storageKey);
      console.log(state);

      // router.push("/dashboard");
    } else {
      setError(state.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [state, type, storageKey, router]);

  const handleSubmit = useCallback(
    (formData: FormData) => {
      if (isLoading) return;
      const formDataObject: Record<string, string> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value.toString();
      });
      return action(formData);
    },
    [action, isLoading]
  );

  return (
    <section className="w-full md:w-[45%] flex-1 flex flex-col items-center justify-center gap-10 px-4 md:px-10 py-8">
      <div className="absolute top-0 right-4">
        <LanguageSwitcher darkMode />
      </div>
      <div className="flex flex-col w-full items-center text-primary-500">
        <GreenLogo size="size-26" />
        <p className="text-4xl font-medium">SherpApp</p>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 w-full text-primary-500 text-center">
          <h1 className="text-3xl md:text-5xl leading-9 font-semibold">
            {t(`${type}.title`)}
          </h1>
          <p className="text-center">{t(`${type}.description`)}</p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-7 w-full">
          {config.fields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              type={field.type as "text" | "email" | "password" | "number"}
              label={t(`${type}.${field.name.replaceAll(" ", "")}`)}
              placeholder={field.placeholder}
              icon={field.icon}
              defaultValue={formData[field.name]}
              onChange={handleInputChange}
            />
          ))}
          {type === "login" && (
            <div className="flex flex-col md:flex-row gap-2 md:justify-between items-start w-full">
              {RenderForgotPassword({ type })}
              {RenderActionLinks({ type })}
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex flex-col gap-4">
            {type === "login" ? (
              RenderActionButton({ type, isLoading })
            ) : (
              <>
                {RenderActionLinks({ type })}
                {RenderActionButton({ type, isLoading })}
              </>
            )}
          </div>
        </form>
        <LinkButtons type={type} />
      </div>
    </section>
  );
};
