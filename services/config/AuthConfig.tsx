import { AuthConfig, AuthType } from "../interfaces/Auth/AuthType";
import { User, KeyRound, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const AUTH_CONFIG: Record<AuthType, AuthConfig> = {
  login: {
    title: "¡Bienvenido de Nuevo!",
    fields: [
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "JuanPerez@gmail.com",
        icon: <User size={12} />,
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        placeholder: "***************",
        icon: <KeyRound size={12} />,
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
    title: "Vamos a crear tu cuenta",
    description:
      "Completa estos datos para empezar tu camino hacia la organización y el exito acedemico. !Es muy sencillo¡",
    fields: [
      {
        name: "name",
        type: "text",
        label: "Nombre",
        placeholder: "Juan",
      },
      {
        name: "lastname",
        placeholder: "Perez",
        type: "text",
        label: "Apellidos",
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
        name: "phone",
        type: "tel",
        label: "Número de Teléfono",
        placeholder: "+",
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        placeholder: "***************",
      },
      {
        name: "password",
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

