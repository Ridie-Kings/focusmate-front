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
    <div
      className="py-24 bg-gradient-to-b from-emerald-50 to-white"
      id="caracteristicas"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold sm:text-5xl text-primary-500 animate-fade-in">
            Características
          </h2>
          <p className="mt-6 text-xl text-primary-500 max-w-3xl mx-auto animate-slide-up">
            Todo lo que necesitas para mantener tu productividad al máximo
            nivel.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 hover:border-emerald-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div>
                  <div className="absolute h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <feature.icon
                      className="h-7 w-7 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-20">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-3 text-base text-gray-600 leading-relaxed">
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
