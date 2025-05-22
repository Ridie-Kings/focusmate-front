import { Check } from "lucide-react";
import Button from "../Reusable/Button";
import Link from "next/link";

const plans = [
  {
    name: "Plan Plus",
    price: "€10",
    period: "/mes",
    description: "Puedes cancelar en cualquier momento",
    features: [
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
    ],
  },
  {
    name: "Plan Gratis",
    price: "€0",
    period: "/mes",
    description: "Lorem ipsum dolor sit amet",
    features: [
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="bg-white py-24" id="planes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-primary-500 sm:text-4xl">
            Elige el plan que se ajuste según tus necesidades
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-primary-500 lg:mx-auto">
            Planes flexibles que crecen contigo.
          </p>
        </div>

        <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 ${
                index === 0 ? "bg-primary-500" : "bg-white"
              } border border-gray-200 rounded-2xl shadow-sm flex flex-col gap-4`}
            >
              <div className="flex-1">
                <h3
                  className={`text-xl font-semibold ${
                    index === 0 ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-4 flex items-baseline ${
                    index === 0 ? "text-white" : "text-gray-900"
                  }`}
                >
                  <span className="text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold">
                    {plan.period}
                  </span>
                </p>
                <p
                  className={`mt-6 ${
                    index === 0 ? "text-white" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>

                <ul role="list" className="mt-6 space-y-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-emerald-500" />
                      <span
                        className={`ml-3 ${
                          index === 0 ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                button={index === 0 ? "secondary" : "primary"}
                type="button"
                size="large"
                href="/login"
              >
                Empezar hoy
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
