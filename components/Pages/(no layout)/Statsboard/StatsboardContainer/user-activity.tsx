"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { GetGlobalInfo } from "@/services/MyStats/GetGlobalInfo";
import { GetStatsBoardInfoUser } from "@/services/MyStats/GetStatsBoardInfoUser";

interface UserActivityProps {
  selectedUser?: string | null;
  viewMode: "personal" | "global";
}

interface UserActivityData {
  streak: number;
  loginCount: number;
  lastLogin: string;
}

interface PomodoroData {
  totalTimeInSeconds: number;
  totalTimeFormatted: string;
  completedPomodoros: number;
}

export function UserActivity({ selectedUser, viewMode }: UserActivityProps) {
  const [activityData, setActivityData] = useState<UserActivityData | null>(
    null
  );
  const [pomodoroData, setPomodoroData] = useState<PomodoroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivityData = async () => {
      if (viewMode !== "personal") {
        setActivityData(null);
        setPomodoroData(null);
        setIsLoading(false);
        return;
      }

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

        setActivityData(data.userActivity);
        setPomodoroData(data.pomodoro);
      } catch (error) {
        console.error("Error loading activity data:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    loadActivityData();
  }, [selectedUser, viewMode]);

  if (viewMode !== "personal") {
    return null;
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Actividad del Usuario
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
            Actividad del Usuario
          </h3>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="p-4">Cargando actividad...</div>
          ) : !activityData ? (
            <div className="p-4">No hay datos disponibles</div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-lg font-bold">🔥</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Racha actual</p>
                  <p className="text-2xl font-bold">
                    {activityData.streak} días
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Último inicio de sesión
                  </p>
                  <p className="text-lg font-medium">
                    {new Date(activityData.lastLogin).toLocaleDateString(
                      "es-ES",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">
                    {activityData.loginCount}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Total de inicios de sesión
                  </p>
                  <p className="text-lg font-medium">
                    {activityData.loginCount} sesiones
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Estadísticas de Pomodoro
          </h3>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="p-4">Cargando estadísticas...</div>
          ) : !pomodoroData ? (
            <div className="p-4">No hay datos disponibles</div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 text-lg font-bold">🍅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pomodoros completados</p>
                  <p className="text-2xl font-bold">
                    {pomodoroData.completedPomodoros}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-600 text-lg font-bold">⏱️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tiempo total enfocado</p>
                  <p className="text-2xl font-bold">
                    {pomodoroData.totalTimeFormatted}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-center">
                  Promedio por pomodoro
                </h3>
                <p className="text-xl font-bold text-center mt-2">
                  {pomodoroData.completedPomodoros > 0
                    ? Math.round(
                        pomodoroData.totalTimeInSeconds /
                          pomodoroData.completedPomodoros /
                          60
                      )
                    : 0}{" "}
                  minutos
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
