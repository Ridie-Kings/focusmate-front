import { UserLogsType } from "@/interfaces/User/UserType";
import {
  Calendar,
  CheckCircle,
  Clock,
  FireExtinguisher,
  Target,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

function StatCard({
  icon,
  label,
  value,
  color = "bg-primary-500",
}: StatCardProps) {
  return (
    <div
      className={`${color} rounded-lg p-4 text-white flex items-center gap-3`}
    >
      <div className="bg-white/20 rounded-full p-2">{icon}</div>
      <div>
        <p className="text-sm opacity-90">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default function MyStats({ stats }: { stats: UserLogsType }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const mainStats = [
    {
      icon: <FireExtinguisher size={20} />,
      label: "Mejor Racha",
      value: stats.bestStreak,
      color: "bg-orange-500",
    },
    {
      icon: <Target size={20} />,
      label: "Racha Actual",
      value: stats.streak,
      color: "bg-green-500",
    },
    {
      icon: <User size={20} />,
      label: "Total Logins",
      value: stats.loginCount,
      color: "bg-blue-500",
    },
    {
      icon: <Clock size={20} />,
      label: "Último Login",
      value: formatDate(stats.lastLogin),
      color: "bg-purple-500",
    },
  ];

  const taskStats = [
    {
      icon: <CheckCircle size={18} />,
      label: "Tareas Completadas",
      value: stats.taskCompleted,
    },
    {
      icon: <TrendingUp size={18} />,
      label: "Total Tareas",
      value: stats.taskCounts,
    },
  ];

  const pomodoroStats = [
    {
      icon: <Zap size={18} />,
      label: "Pomodoros Completados",
      value: stats.pomodoroCompleted,
    },
    {
      icon: <Clock size={18} />,
      label: "Pomodoros Iniciados",
      value: stats.pomodoroStarted,
    },
    {
      icon: <CheckCircle size={18} />,
      label: "Pomodoros Finalizados",
      value: stats.pomodoroFinished,
    },
  ];

  const habitStats = [
    {
      icon: <Target size={18} />,
      label: "Hábitos Completados",
      value: stats.habitCompleted,
    },
    {
      icon: <TrendingUp size={18} />,
      label: "Total Hábitos",
      value: stats.habitCounts,
    },
    {
      icon: <TrendingUp size={18} />,
      label: "Habitos activos",
      value: stats.habitCounts - stats.habitDeleted,
    },
  ];

  const calendarStats = [
    {
      icon: <Calendar size={18} />,
      label: "Eventos Creados",
      value: stats.EventsCalendarCreated,
    },
  ];

  return (
    <main className="flex flex-col w-full h-full gap-6 p-6">
      {/* Estadísticas Principales */}
      <div>
        <h2 className="text-2xl text-primary-500 mb-4">
          Estadísticas Generales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Estadísticas Detalladas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tareas */}
        <div className="bg-white rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-primary-500 mb-4 flex items-center gap-2">
            <CheckCircle size={20} />
            Tareas
          </h3>
          <div className="space-y-3">
            {taskStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {stat.icon}
                  {stat.label}
                </div>
                <span className="font-semibold text-primary-500">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pomodoro */}
        <div className="bg-white rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-primary-500 mb-4 flex items-center gap-2">
            <Clock size={20} />
            Pomodoro
          </h3>
          <div className="space-y-3">
            {pomodoroStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {stat.icon}
                  {stat.label}
                </div>
                <span className="font-semibold text-primary-500">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hábitos y Calendario */}
        <div className="space-y-6">
          {/* Hábitos */}
          <div className="bg-white rounded-lg p-6 border">
            <h3 className="text-lg font-semibold text-primary-500 mb-4 flex items-center gap-2">
              <Target size={20} />
              Hábitos
            </h3>
            <div className="space-y-3">
              {habitStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {stat.icon}
                    {stat.label}
                  </div>
                  <span className="font-semibold text-primary-500">
                    {stat.value <= 0 ? 0 : stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendario */}
          <div className="bg-white rounded-lg p-6 border">
            <h3 className="text-lg font-semibold text-primary-500 mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Calendario
            </h3>
            <div className="space-y-3">
              {calendarStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {stat.icon}
                    {stat.label}
                  </div>
                  <span className="font-semibold text-primary-500">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Información de Cuenta */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary-500 mb-4">
          Información de Cuenta
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Cuenta creada:</span>
            <span className="ml-2 font-medium">
              {formatDate(stats.createdAt)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Último login:</span>
            <span className="ml-2 font-medium">
              {formatDate(stats.lastLogin)}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
