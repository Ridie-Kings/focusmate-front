"use client";
import Image from "next/image";
import { useState } from "react";

const benefits = [
  {
    id: 1,
    title: "Ahorro de Tiempo",
    description:
      "Reduce el tiempo perdido entre aplicaciones y maximiza tu productividad.",
  },
  {
    id: 2,
    title: "Flujo de trabajo más claro",
    description:
      "Visualiza y organiza tus tareas de manera intuitiva y efectiva.",
  },
  {
    id: 3,
    title: "Menos distracciones",
    description:
      "Mantén el foco en lo importante con una interfaz limpia y organizada.",
  },
  {
    id: 4,
    title: "Experiencia unificada y accesible",
    description: "Accede a todas tus herramientas desde cualquier dispositivo.",
  },
];

export default function Benefits() {
  const [openBenefit, setOpenBenefit] = useState<number | null>(null);

  return (
    <div
      className="bg-gradient-to-b from-white to-emerald-50 py-24"
      id="beneficios"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold sm:text-5xl text-primary-500 animate-fade-in">
            Beneficios
          </h2>
          <p className="mt-6 text-xl text-primary-500 max-w-3xl mx-auto animate-slide-up">
            Descubre cómo SherpApp puede transformar tu manera de trabajar.
          </p>
        </div>

        <div className="mt-20 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
              <Image
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                src="/images/dashboard-preview.png"
                alt="Dashboard Preview"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent animate-pulse-slow" />
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <dl className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.id}
                  className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-emerald-100 hover:border-emerald-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() =>
                    setOpenBenefit(
                      openBenefit === benefit.id ? null : benefit.id
                    )
                  }
                >
                  <dt>
                    <button className="flex w-full items-center justify-between text-left cursor-pointer">
                      <p className="text-xl font-semibold text-gray-900">
                        {benefit.title}
                      </p>
                      <svg
                        className={`h-6 w-6 transform transition-transform duration-300 ${
                          openBenefit === benefit.id ? "rotate-180" : ""
                        } text-emerald-500`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </dt>
                  <dd
                    className={`mt-4 text-base text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${
                      openBenefit === benefit.id
                        ? "max-h-24 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {benefit.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
