import { useState } from "react";
import Image from "next/image";
import { AuthField } from "@/interfaces/Auth/AuthType";
import { InputField } from "./InputField";
import { AuthHeader } from "./AuthHeader";
import { AUTH_CONFIG } from "@/config/AuthConfig";

export const AuthForm = ({ type, onSubmit }: AuthField) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const config = AUTH_CONFIG[type];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="w-[45%] h-full flex flex-col items-center justify-center gap-10">
      {type === "login" && (
        <Image
          src="/images/logoLogin.png"
          width={75}
          height={75}
          alt="logo"
          priority
        />
      )}

      <h1 className="text-6xl">{config.title}</h1>
      <AuthHeader type={type} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
        {config.fields.map((field) => (
          <InputField
            key={field.name}
            {...field}
            onChange={handleInputChange}
          />
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
