import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const navigation = {
  legal: [
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de privacidad", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-emerald-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-white text-2xl font-bold">
              SherpApp
            </Link>
            <p className="text-gray-300 text-base">
              Tu productividad, simplificada.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Navegación
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#inicio"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#caracteristicas"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Características
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#beneficios"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Beneficios
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#faq"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contacto"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} SherpApp. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
