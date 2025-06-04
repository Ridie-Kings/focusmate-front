import Link from "next/link";
import "../globals.css";
import Svg404noname from "@/components/Elements/Svg/Svg404noname";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-primary-500">
      <div className="flex items-center justify-center flex-1">
        <div className="bg-[linear-gradient(117deg,_rgba(120,_198,_163,_0.25)_8.54%,_rgba(120,_198,_163,_0.20)_48.97%,_rgba(120,_198,_163,_0.15)_92.62%)] rounded-4xl border-2 border-[rgba(120,198,163,0.52)] backdrop-blur-lg p-10 w-4/5 text-center">
          <h1 className="text-9xl font-bold text-text-secondary">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-text-secondary">
            Página no encontrada
          </h2>
          <p className="mt-2 text-text-secondary">
            La página que buscas no existe o ha sido movida.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block px-6 py-3 bg-primary-500 text-text-secondary font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
      <Svg404noname />
    </div>
  );
}
