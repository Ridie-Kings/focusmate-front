import Button from "../Reusable/Button";

export default function ContactForm() {
  return (
    <div
      className="bg-gradient-to-b from-emerald-50 to-white py-24"
      id="contacto"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-primary-500 sm:text-5xl animate-fade-in">
              Contacto
            </h2>
            <p className="mt-6 text-xl text-primary-500 max-w-3xl mx-auto animate-slide-up">
              ¿Tienes alguna pregunta? Estaremos encantados de ayudarte.
            </p>
          </div>
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 animate-fade-in-up">
            <form className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
              <div
                className="animate-fade-in"
                style={{ animationDelay: "150ms" }}
              >
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Tu nombre"
                    autoComplete="given-name"
                    className="py-3 px-4 block w-full border border-emerald-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
                  />
                </div>
              </div>
              <div
                className="animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="correo"
                    id="correo"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    className="py-3 px-4 block w-full border border-emerald-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
                  />
                </div>
              </div>
              <div
                className="sm:col-span-2 animate-fade-in"
                style={{ animationDelay: "450ms" }}
              >
                <label
                  htmlFor="asunto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asunto
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="asunto"
                    id="asunto"
                    placeholder="Asunto del mensaje"
                    className="py-3 px-4 block w-full border border-emerald-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
                  />
                </div>
              </div>
              <div
                className="sm:col-span-2 animate-fade-in"
                style={{ animationDelay: "600ms" }}
              >
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mensaje
                </label>
                <div className="mt-2">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Tu mensaje aquí..."
                    className="py-3 px-4 block w-full border border-emerald-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
                  />
                </div>
              </div>
              <div
                className="sm:col-span-2 animate-fade-in"
                style={{ animationDelay: "750ms" }}
              >
                <Button
                  type="submit"
                  button="primary"
                  size="large"
                  className="w-full py-4 text-lg font-semibold hover:scale-105 transition-transform"
                >
                  Enviar mensaje
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
