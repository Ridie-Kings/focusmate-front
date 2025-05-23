import Button from "../Reusable/Button";

export default function ContactForm() {
  return (
    <div className=" py-24" id="contacto">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-primary-500 sm:text-4xl">
              Contacto
            </h2>
            <p className="mt-4 text-lg text-primary-500">
              ¿Tienes alguna pregunta? Estaremos encantados de ayudarte.
            </p>
          </div>
          <div className="mt-12">
            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Tu nombre"
                    autoComplete="given-name"
                    className="py-2 px-2 block w-full border border-primary-200 focus:border-emerald-500 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="correo"
                    id="correo"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    className="py-2 px-2 block w-full border border-primary-200 focus:border-emerald-500 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="asunto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asunto
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="asunto"
                    id="asunto"
                    placeholder="Asunto del mensaje"
                    className="py-2 px-2 block w-full border border-primary-200 focus:border-emerald-500 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mensaje
                </label>
                <div className="mt-1">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Tu mensaje aquí..."
                    className="py-2 px-2 block w-full border border-primary-200 focus:border-emerald-500 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" button="primary" size="large" className="w-full">
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
