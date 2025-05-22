"use client";
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
    <div className="bg-secondary-200 py-24" id="beneficios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-primary-500">
            Beneficios
          </h2>
          <p className="mt-4 w-full text-lg text-primary-500">
            Descubre cómo SherpApp puede transformar tu manera de trabajar.
          </p>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div className="relative">
            <div className="relative">
              <img
                className="rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
                src="/images/dashboard-preview.png"
                alt="Dashboard Preview"
                width={800}
                height={600}
              />
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <dl className="space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="relative border rounded-lg p-4 bg-neutral-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    setOpenBenefit(
                      openBenefit === benefit.id ? null : benefit.id
                    )
                  }
                >
                  <dt>
                    <button className="flex w-full items-center justify-between text-left cursor-pointer">
                      <p className="text-lg leading-6 font-medium text-gray-900">
                        {benefit.title}
                      </p>
                      <svg
                        className={`h-6 w-6 transform ${
                          openBenefit === benefit.id ? "rotate-180" : ""
                        } text-gray-500`}
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
                    className={`mt-2 text-base text-gray-500 overflow-hidden transition-all duration-500 ease-in-out ${
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
