import Button from "../Reusable/Button";

export default function Hero() {
  return (
    <div className="relative bg-white pt-16 pb-25 overflow-hidden">
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:gap-24">
          <div className="px-4 max-w-xl mx-auto text-center sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div className="mt-6 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Tu productividad, simplificada.
                </h1>
                <p className="mt-4 text-lg text-gray-500">
                  SherpApp centraliza tus herramientas de organización y
                  planificación en un solo lugar: calendario, tareas, horarios y
                  objetivos sin saltar de una app a otra.
                </p>
                <div className="mt-8 flex justify-center items-center space-x-4">
                  <Button
                    type="button"
                    button="primary"
                    size="compact"
                    href="/login"
                  >
                    Prueba Gratuita
                  </Button>
                  <Button
                    type="button"
                    button="secondary"
                    size="compact"
                    href="#como-funciona"
                  >
                    Ver cómo funciona
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
