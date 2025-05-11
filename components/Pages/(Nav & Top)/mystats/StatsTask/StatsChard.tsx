import { BarChart } from "recharts";
import { useEffect, useState } from "react";
import {
  Bar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GetMyStatsWeek } from "@/services/Dashboard/GetMyStatsWeek";

interface MonthlyStatsData {
  date: string;
  tasksCreated: number;
  tasksCompleted: number;
  habitsCreated: number;
  pomodorosStarted: number;
}

export default function StatsChard() {
  const [dailyStats, setDailyStats] = useState<MonthlyStatsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDailyStats = async () => {
      setError(null);
      try {
        const { data, success } = await GetMyStatsWeek();
        if (!success) {
          throw new Error(`Error en la API: ${data}`);
        }

        setDailyStats(data.trends.dailyStats);
      } catch (error) {
        console.error("Error loading daily stats:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    };

    loadDailyStats();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
    });
  };

  const chartData = dailyStats.map((stat) => ({
    ...stat,
    date: formatDate(stat.date),
  }));

  if (error) {
    return (
      <div className="overflow-hidden">
        <div className="p-6">
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            Error al cargar datos: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="tasksCreated" name="Tareas Creadas" fill="#8884d8" />
        <Bar
          dataKey="tasksCompleted"
          name="Tareas Completadas"
          fill="#82ca9d"
        />
        <Bar
          dataKey="pomodorosStarted"
          name="Pomodoros Iniciados"
          fill="#ffc658"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
