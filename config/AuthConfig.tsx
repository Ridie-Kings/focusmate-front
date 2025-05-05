import { AuthConfig, AuthType } from "../interfaces/Auth/AuthType";
import { User, KeyRound } from "lucide-react";

export const AUTH_CONFIG: Record<AuthType, AuthConfig> = {
  login: {
    title: "¡Bienvenido de Nuevo!",
    description: "Organiza tu tiempo, alcanza tus metas.",
    fields: [
      {
        name: "email",
        type: "email",
        label: "Correo Electrónico",
        placeholder: "fedegarcia@gmail.com",
        icon: <User size={18} />,
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        placeholder: "***************",
        icon: <KeyRound size={18} />,
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
        name: "email",
        type: "email",
        label: "Correo Electrónico",
        placeholder: "fedegarcia@gmail.com",
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
    ],
  },
};
