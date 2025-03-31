import { AuthConfig, AuthType } from "../interfaces/Auth/AuthType";
import { User, KeyRound, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const AUTH_CONFIG: Record<AuthType, AuthConfig> = {
  login: {
    title: "¡Bienvenido de Nuevo!",
    description: "Organiza tu tiempo, alcanza tus metas.",
    fields: [
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "JuanPerez@gmail.com",
        icon: <User size={16} />,
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        placeholder: "***************",
        icon: <KeyRound size={16} />,
      },
    ],
  },
  register: {
    title: "Vamos a crear tu cuenta",
    description:
      "Completa estos datos para empezar tu camino hacia la organización y el exito acedemico. !Es muy sencillo¡",
    fields: [
      {
        name: "fullname",
        type: "text",
        label: "Nombre",
        placeholder: "Federico Garcia",
      },
      {
        name: "username",
        type: "text",
        label: "Nombre de Usuario",
        placeholder: "juanperez",
      },
      {
        name: "email",
        type: "email",
        label: "Correo Electrónico",
        placeholder: "juanperez@gmail.com",
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        placeholder: "***************",
      },
      {
        name: "repeat password",
        type: "password",
        label: "Repite Contraseña",
        placeholder: "***************",
      },
      {
        name: "birthdate",
        type: "date",
        label: "Cumpleaños",
        placeholder: "DD/MM/YYYY",
      },
    ],
  },
};
