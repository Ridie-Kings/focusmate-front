import Button from "../Reusable/Button";

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-white to-emerald-50 pt-32 pb-32 overflow-hidden">
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:gap-24">
          <div className="px-4 max-w-2xl mx-auto text-center sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div className="mt-6 flex flex-col items-center">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400 animate-fade-in">
                  Tu productividad, simplificada.
                </h1>
                <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-2xl animate-slide-up">
                  SherpApp centraliza tus herramientas de organización y
                  planificación en un solo lugar: calendario, tareas, horarios y
                  objetivos sin saltar de una app a otra.
                </p>
                <div className="mt-10 flex justify-center items-center space-x-6 animate-fade-in-delayed">
                  <Button
                    type="button"
                    button="primary"
                    size="large"
                    href="/login"
                    className="px-8 py-3 text-lg hover:scale-105 transition-transform"
                  >
                    Prueba Gratuita
                  </Button>
                  <Button
                    type="button"
                    button="secondary"
                    size="large"
                    href="#como-funciona"
                    className="px-8 py-3 text-lg hover:scale-105 transition-transform"
                  >
                    Ver cómo funciona
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-100/20 via-transparent to-transparent animate-pulse-slow" />
      </div>
    </div>
  );
}
