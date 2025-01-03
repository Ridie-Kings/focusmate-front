import { AuthConfig, AuthType } from "../interfaces/Auth/AuthType";
import { User, KeyRound, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const AUTH_CONFIG: Record<AuthType, AuthConfig> = {
  login: {
    title: "Iniciar Sesión",
    fields: [
      {
        name: "email",
        type: "email",
        label: "Email",
        icon: <User size={16} />,
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        icon: <KeyRound size={16} />,
      },
    ],
    otherElements: (
      <>
        <Link href="#" className="text-sm">
          ¿Olvidaste tu contraseña?
        </Link>
        <div className="flex flex-col items-center w-full gap-2">
          <p>o</p>
          <button type="button" className="flex items-center gap-2">
            <LinkIcon size={20} />
            <p>Iniciar Sesión con Google</p>
          </button>
        </div>
      </>
    ),
  },
  register: {
    title: "Registro",
    fields: [
      {
        name: "name",
        type: "text",
        label: "Nombre",
      },
      {
        name: "lastname",
        type: "text",
        label: "Apellidos",
      },
      {
        name: "username",
        type: "text",
        label: "Nombre de Usuario",
      },
      {
        name: "email",
        type: "email",
        label: "Correo Electrónico",
      },
      {
        name: "phone",
        type: "tel",
        label: "Número de Teléfono",
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
      },
      {
        name: "password",
        type: "password",
        label: "Repite Contraseña",
      },
      {
        name: "birthdate",
        type: "date",
        label: "Cumpleaños",
      },
    ],
  },
};