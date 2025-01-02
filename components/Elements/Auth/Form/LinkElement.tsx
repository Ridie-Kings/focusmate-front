import Link from "next/link";

export default function LinkElement({ page }: { page: "Login" | "Register" }) {
  return (
    <div className="flex gap-1 w-full items-start">
      {page === "Login" ? (
        <>
          <p>Soy Usuario /</p>
          <Link href={"/register"} className="underline">
            Crear usuario
          </Link>
        </>
      ) : (
        <>
          <Link href={"/login"} className="underline">
            Soy Usuario
          </Link>
          <p>/ Crear usuario </p>
        </>
      )}
    </div>
  );
}
