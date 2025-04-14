import { AUTH_CONFIG } from "@/config/AuthConfig";
import Link from "next/link";

export default function RenderForgotPassword({ type }: { type: string }) {
  if (type === "login")
    return (
      <Link href="#" className="underline">
        ¿Olvidaste tu contraseña?
      </Link>
    );
  else return;
}
