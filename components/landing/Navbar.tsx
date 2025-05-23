import Link from "next/link";
import GreenLogo from "../Elements/Svg/Logos/GreenLogo";
import Button from "../Reusable/Button";
import { getToken } from "@/lib";

export default async function Navbar() {
  const token = await getToken();

  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <GreenLogo size="size-10" />
              <span className="ml-2 text-xl font-semibold text-primary-500">
                SherpApp
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#caracteristicas"
              className="text-primary-500 hover:text-primary-600"
            >
              Características
            </Link>
            <Link
              href="#beneficios"
              className="text-primary-500 hover:text-primary-600"
            >
              Beneficios
            </Link>
            <Link
              href="#planes"
              className="text-primary-500 hover:text-primary-600"
            >
              Planes
            </Link>
            <Link
              href="#faq"
              className="text-primary-500 hover:text-primary-600"
            >
              FAQ
            </Link>
            <Link
              href="#contacto"
              className="text-primary-500 hover:text-primary-600"
            >
              Contacto
            </Link>
          </div>

          {token ? (
            <Button type="button" button="primary" size="compact" href="/dashboard">
              Dashboard
            </Button>
          ) : (
            <Button type="button" button="primary" size="compact" href="/login">
              Empezar
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
