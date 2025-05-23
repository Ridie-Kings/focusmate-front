import { CalendarDays, Bell, ListTodo, Target } from "lucide-react";

const features = [
  {
    name: "Calendario Integrado",
    description:
      "Visualiza tus eventos, tareas y recordatorios en un solo lugar, de forma clara y sincronizada.",
    icon: CalendarDays,
  },
  {
    name: "Trackeo de hábitos y objetivos",
    description:
      "Visualiza y monitorea tus metas con métricas claras y motivadoras.",
    icon: Target,
  },
  {
    name: "Recordatorios y notificaciones",
    description:
      "Nunca más olvides lo importante: recibe alertas personalizadas en el momento justo.",
    icon: Bell,
  },
  {
    name: "Lista de tareas inteligentes",
    description:
      "Organiza tus pendientes por prioridad, configura su fecha y observa tu progreso fácilmente.",
    icon: ListTodo,
  },
];

export default function Features() {
  return (
    <div className="py-24" id="caracteristicas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-primary-500">
            Características
          </h2>
          <p className="mt-4 w-full text-lg text-primary-500">
            Todo lo que necesitas para mantener tu productividad al máximo
            nivel.
          </p>
        </div>

        <div className="mt-15">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="absolute h-12 w-12 rounded-md bg-emerald-500 flex items-center justify-center">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
