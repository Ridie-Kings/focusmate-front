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
    <div className="bg-gradient-to-b from-emerald-50 to-white py-24" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-primary-500 sm:text-5xl animate-fade-in">
            ¡Respuestas a tus Preguntas!
          </h2>
          <p className="mt-6 text-xl text-primary-500 max-w-3xl mx-auto animate-slide-up">
            Todo lo que necesitas saber sobre SherpApp.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-emerald-100 hover:border-emerald-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer hover:bg-emerald-50/50 transition-colors"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="h-6 w-6 text-emerald-500 transform transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-emerald-500 transform transition-transform duration-300" />
                    )}
                  </span>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-48 opacity-100 pb-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
