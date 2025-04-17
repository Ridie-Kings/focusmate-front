import Link from "next/link";

export default function RenderActionLinks({ type }: { type: string }) {
  if (type === "login")
    return (
      <Link href="/register" className="underline">
        <p>¿No tienes cuenta? Registrate</p>
      </Link>
    );
  else
    return (
      <Link href="/login" className="underline">
        <p>¿Ya tienes cuenta? Inicia Sesión</p>
      </Link>
    );
}
