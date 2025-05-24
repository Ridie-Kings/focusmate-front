import { Check } from "lucide-react";
import Button from "../Reusable/Button";

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
    <div
      className="bg-gradient-to-b from-white to-emerald-50 py-24"
      id="planes"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-primary-500 sm:text-5xl animate-fade-in">
            Elige el plan que se ajuste según tus necesidades
          </h2>
          <p className="mt-6 text-xl text-primary-500 max-w-3xl mx-auto animate-slide-up">
            Planes flexibles que crecen contigo.
          </p>
        </div>

        <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 ${
                index === 0
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                  : "bg-white"
              } rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
                index === 0 ? "border-emerald-400" : "border-emerald-100"
              } hover:border-emerald-200 flex flex-col gap-6 animate-fade-in-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex-1">
                <h3
                  className={`text-2xl font-bold ${
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
                  <span className="text-6xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold">
                    {plan.period}
                  </span>
                </p>
                <p
                  className={`mt-6 text-lg ${
                    index === 0 ? "text-emerald-100" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>

                <ul role="list" className="mt-8 space-y-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className="flex items-start animate-fade-in"
                      style={{
                        animationDelay: `${index * 200 + featureIndex * 100}ms`,
                      }}
                    >
                      <div className="flex-shrink-0">
                        <Check
                          className={`h-6 w-6 ${
                            index === 0
                              ? "text-emerald-200"
                              : "text-emerald-500"
                          }`}
                        />
                      </div>
                      <span
                        className={`ml-3 text-base ${
                          index === 0 ? "text-white" : "text-gray-600"
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
                className="w-full py-4 text-lg font-semibold hover:scale-105 transition-transform"
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
