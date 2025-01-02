import { itemsForm } from "@/components/Pages/Auth";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function FormComponent({
  itemsForm,
  page,
}: {
  itemsForm: itemsForm[];
  page: "Login" | "Register";
}) {
  return (
    <form className="flex flex-col gap-7 w-full">
      {itemsForm.map((items) => (
        <div
          key={items.label}
          className="flex items-center justify-center w-full"
        >
          <div className="relative w-full">
            <input
              id={items.type}
              name={items.name}
              type={items.type}
              placeholder=""
              defaultValue={""}
              autoComplete="false"
              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-black-100 transition-colors focus:outline-none peer bg-inherit w-full decoration-transparent"
            />
            <label className=" text-gray-100 absolute -top-6 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-6 transition-all peer-focus:text-black peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm non flex items-center gap-1">
              {items.icon}
              {items.label}
            </label>
          </div>
        </div>
      ))}
      {page === "Login" && <Link href={"#"}>¿Olvidaste tu contraseña?</Link>}
      <button className="w-full bg-black-100 py-2 rounded-lg text-white-100">
        {page === "Login" ? "Iniciar Sesion" : "Registrase"}
      </button>
      {page === "Login" && (
        <div className="flex flex-col items-center w-full gap-2">
          <p>o</p>
          <div className="flex items-center gap-2">
            <LinkIcon size={20} />
            <p>Iniciar Sesion con Google</p>
          </div>
        </div>
      )}
    </form>
  );
}
