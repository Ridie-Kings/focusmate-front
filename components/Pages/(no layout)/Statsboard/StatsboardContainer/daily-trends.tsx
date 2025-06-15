"use client";

import { GetGlobalInfo } from "@/services/MyStats/GetGlobalInfo";
import { GetStatsWeekByUserId } from "@/services/MyStats/GetStatsWeekByUserId";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DailyTrendsProps {
  selectedUser?: string | null;
  viewMode: "personal" | "global";
}

interface DailyStatsData {
  date: string;
  tasksCreated: number;
  tasksCompleted: number;
  habitsCreated: number;
  pomodorosStarted: number;
}

export function DailyTrends({ selectedUser, viewMode }: DailyTrendsProps) {
  const [dailyStats, setDailyStats] = useState<DailyStatsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDailyStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, success } =
          viewMode === "personal" && selectedUser
            ? await GetStatsWeekByUserId({ id: selectedUser })
            : await GetGlobalInfo();

        if (!success) {
          throw new Error(`Error en la API: ${data}`);
        }

        const stats =
          viewMode === "global"
            ? data.trends.dailyStats
            : data.weeklyStats || [];

        setDailyStats(stats);
      } catch (error) {
        console.error("Error loading daily stats:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    loadDailyStats();
  }, [selectedUser, viewMode]);

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
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Tendencias Diarias
          </h3>
        </div>
        <div className="p-6">
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            Error al cargar datos: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Tendencias Diarias
        </h3>
      </div>
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-80">
            <p>Cargando datos...</p>
          </div>
        ) : dailyStats.length === 0 ? (
          <div className="flex items-center justify-center h-80">
            <p>No hay datos disponibles para mostrar</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="tasksCreated"
                name="Tareas Creadas"
                fill="#8884d8"
              />
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
        )}
      </div>
    </div>
  );
}
