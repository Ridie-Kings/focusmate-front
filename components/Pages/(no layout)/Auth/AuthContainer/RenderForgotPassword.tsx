import Link from "next/link";

export default function RenderForgotPassword({ type }: { type: string }) {
  if (type === "login")
    return (
      <Link href="/passwordrecovery" className="underline">
        ¿Olvidaste tu contraseña?
      </Link>
    );
  else return;
}
