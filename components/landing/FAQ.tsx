"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "¿SherpApp es gratuito?",
    answer:
      "SherpApp ofrece una prueba gratuita de 14 días con todas las funcionalidades. Después, puedes elegir entre nuestros planes según tus necesidades.",
  },
  {
    question: "¿Necesito descargar algo para usar SherpApp?",
    answer:
      "No, SherpApp es una aplicación web que funciona directamente desde tu navegador. No necesitas descargar ni instalar nada.",
  },
  {
    question: "¿SherpApp funciona para equipos de trabajo?",
    answer:
      "Sí, SherpApp tiene funcionalidades específicas para equipos, permitiendo la colaboración y gestión de proyectos en grupo.",
  },
  {
    question: "¿Qué tan segura es mi información en SherpApp?",
    answer:
      "Tu información está protegida con encriptación de nivel bancario. Utilizamos los más altos estándares de seguridad para proteger tus datos.",
  },
  {
    question: "¿Puedo usar SherpApp sin conexión a internet?",
    answer:
      "SherpApp tiene funcionalidades offline que te permiten seguir trabajando sin conexión. Tus datos se sincronizarán automáticamente cuando vuelvas a conectarte.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className=" py-24" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-3xl font-extrabold text-primary-500 sm:text-4xl">
            ¡Respuestas a tus Preguntas!
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-primary-500 lg:mx-auto">
            Todo lo que necesitas saber sobre SherpApp.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="py-6 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <button className="text-left w-full flex justify-between items-start text-gray-400 cursor-pointer">
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <span className="ml-6">
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6" />
                  ) : (
                    <ChevronDown className="h-6 w-6" />
                  )}
                </span>
              </button>
              <dd
                className={`mt-2 text-base text-gray-500 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-24 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {faq.answer}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
