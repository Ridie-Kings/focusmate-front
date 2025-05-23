import "../globals.css";
import Link from "next/link";
import { MapPin, ArrowLeft, Compass, Mountain } from "lucide-react";
import Button from "@/components/Reusable/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center px-4 z-10">
        <div className="relative mb-4">
          <div className="absolute -inset-1 rounded-full bg-[#014e44]/20 blur-lg"></div>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#014e44]">
            <Mountain className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="mb-2 text-6xl font-bold text-[#014e44]">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Ruta No Encontrada
        </h2>
        <p className="mb-8 text-gray-600">
          Parece que te has salido del sendero marcado. La ruta que estás
          buscando no existe o ha sido movida a otra ubicación.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button button="primary" type="button" size="large">
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
          <Button button="primary" type="button" size="large">
            <Compass className="mr-2 h-4 w-4 flex items-center" />
            Explorar Rutas
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#014e44"
            fillOpacity="0.1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full"
          >
            <path
              fill="#014e44"
              fillOpacity="0.2"
              d="M0,0L120,10.7C240,21,480,43,720,53.3C960,64,1200,64,1320,64L1440,64L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full absolute bottom-0"
          >
            <path
              fill="#014e44"
              fillOpacity="0.3"
              d="M0,0L48,5.3C96,11,192,21,288,37.3C384,53,480,75,576,69.3C672,64,768,32,864,21.3C960,11,1056,21,1152,32C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="absolute top-10 left-10 opacity-10">
        <MapPin className="h-16 w-16 text-[#014e44]" />
      </div>
      <div className="absolute top-20 right-10 opacity-10">
        <Compass className="h-16 w-16 text-[#014e44]" />
      </div>
    </div>
  );
}
