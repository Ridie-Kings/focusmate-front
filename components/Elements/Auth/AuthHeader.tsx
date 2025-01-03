import { AuthHeaderProps } from "@/services/interfaces/Auth/AuthType";
import Link from "next/link";

export const AuthHeader = ({ type }: AuthHeaderProps) => (
  <div className="flex gap-1 w-full items-start">
    {type === "login" ? (
      <>
        <p>Soy Usuario /</p>
        <Link href="/register" className="underline">
          Crear usuario
        </Link>
      </>
    ) : (
      <>
        <Link href="/login" className="underline">
          Soy Usuario
        </Link>
        <p>/ Crear usuario</p>
      </>
    )}
  </div>
);
