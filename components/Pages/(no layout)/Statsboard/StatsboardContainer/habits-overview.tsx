"use client";

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
import { CalendarDays, CheckCircle } from "lucide-react";
import { GetGlobalInfo } from "@/services/MyStats/GetGlobalInfo";
import { GetStatsBoardInfoUser } from "@/services/MyStats/GetStatsBoardInfoUser";

interface HabitsOverviewProps {
  selectedUser?: string | null;
  viewMode: "personal" | "global";
}

interface HabitsData {
  totalHabits: number;
  activeHabits: number;
  completedToday: number;
  bestStreak: number;
  habitsByFrequency: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export function HabitsOverview({
  selectedUser,
  viewMode,
}: HabitsOverviewProps) {
  const [habitsData, setHabitsData] = useState<HabitsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHabitsData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, success } =
          viewMode === "personal" && selectedUser
            ? await GetStatsBoardInfoUser({ id: selectedUser })
            : await GetGlobalInfo();

        if (!success) {
          throw new Error(`Error en la API: ${data}`);
        }

        if (viewMode === "personal") {
          setHabitsData(data.habits);
        } else {
          setHabitsData({
            totalHabits: data.summary.totalHabits,
            activeHabits: data.summary.totalHabits,
            completedToday: 0,
            bestStreak: 0,
            habitsByFrequency: {
              daily: 0,
              weekly: 0,
              monthly: 0,
            },
          });
        }
      } catch (error) {
        console.error("Error loading habits data:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    loadHabitsData();
  }, [selectedUser, viewMode]);

  const prepareFrequencyData = (habits: HabitsData | null) => {
    if (!habits) return [];

    return [
      { name: "Diarios", value: habits.habitsByFrequency.daily },
      { name: "Semanales", value: habits.habitsByFrequency.weekly },
      { name: "Mensuales", value: habits.habitsByFrequency.monthly },
    ];
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Resumen de Hábitos
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
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Estado de Hábitos
          </h3>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-52">
              <p>Cargando datos...</p>
            </div>
          ) : !habitsData ? (
            <div className="flex items-center justify-center h-52">
              <p>No hay datos disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="text-lg font-semibold">Hábitos Activos</h3>
                <p className="text-3xl font-bold mt-2">
                  {habitsData.activeHabits}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  de {habitsData.totalHabits} totales
                </p>
              </div>

              {viewMode === "personal" && (
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                  <CalendarDays className="h-8 w-8 text-blue-500 mb-2" />
                  <h3 className="text-lg font-semibold">Completados Hoy</h3>
                  <p className="text-3xl font-bold mt-2">
                    {habitsData.completedToday}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    de {habitsData.activeHabits} activos
                  </p>
                </div>
              )}

              {viewMode === "personal" && (
                <div className="col-span-2 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className="text-yellow-600 text-lg font-bold">
                        🔥
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Mejor Racha</h3>
                      <p className="text-3xl font-bold">
                        {habitsData.bestStreak} días
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {viewMode === "personal" && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Hábitos por Frecuencia
            </h3>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-80">
                <p>Cargando datos...</p>
              </div>
            ) : !habitsData ? (
              <div className="flex items-center justify-center h-80">
                <p>No hay datos disponibles</p>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={prepareFrequencyData(habitsData)}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Cantidad" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
