"use client";

import { useState, useEffect } from "react";
import { Clock, CheckSquare, Calendar, Activity, Users } from "lucide-react";
import { GetGlobalInfo } from "@/services/MyStats/GetGlobalInfo";
import { GetStatsBoardInfoUser } from "@/services/MyStats/GetStatsBoardInfoUser";
import LoadingState from "@/components/Elements/General/LoadingState";

interface KpiCardsProps {
  selectedUser?: string | null;
  viewMode: "personal" | "global";
}

interface KpiData {
  totalUsers?: number;
  totalTasks: number;
  completedTasks: number;
  completionRate: string;
  totalHabits: number;
  totalPomodoros: number;
  completedPomodoros: number;
  streak?: number;
  loginCount?: number;
}

export function KpiCards({ selectedUser, viewMode }: KpiCardsProps) {
  const [kpiData, setKpiData] = useState<KpiData>({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    completionRate: "0%",
    totalHabits: 0,
    totalPomodoros: 0,
    completedPomodoros: 0,
    streak: 0,
    loginCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadKpiData = async () => {
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

        if (viewMode === "global") {
          setKpiData({
            totalUsers: data.summary.totalUsers,
            totalTasks: data.summary.totalTasks,
            completedTasks: data.summary.completedTasks,
            completionRate: data.summary.completionRate,
            totalHabits: data.summary.totalHabits,
            totalPomodoros: data.summary.totalPomodoros,
            completedPomodoros: data.summary.completedPomodoros,
          });
        } else {
          setKpiData({
            totalTasks: data.tasks.totalTasks,
            completedTasks: data.tasks.completedTasks,
            completionRate:
              data.tasks.totalTasks > 0
                ? `${(
                    (data.tasks.completedTasks / data.tasks.totalTasks) *
                    100
                  ).toFixed(1)}%`
                : "0%",
            totalHabits: data.habits.totalHabits,
            totalPomodoros: data.pomodoro.completedPomodoros,
            completedPomodoros: data.pomodoro.completedPomodoros,
            streak: data.userActivity.streak,
            loginCount: data.userActivity.loginCount,
          });
        }
      } catch (error) {
        console.error("Error loading KPI data:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    loadKpiData();
  }, [selectedUser, viewMode]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error al cargar datos: {error}
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState variant="skeleton" text="Cargando datos..." />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {viewMode === "global" && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">Usuarios Activos</span>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{kpiData.totalUsers}</div>
          <p className="text-xs text-muted-foreground mt-1">
            En el período seleccionado
          </p>
        </div>
      )}

      {viewMode === "personal" && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium">Racha Actual</span>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{kpiData.streak} días</div>
          <p className="text-xs text-muted-foreground mt-1">
            Sesiones consecutivas
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium">Pomodoros Completados</span>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{kpiData.completedPomodoros}</div>
        <p className="text-xs text-muted-foreground mt-1">Total de pomodoros</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium">Tareas Completadas</span>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{kpiData.completedTasks}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {kpiData.completionRate} de finalización
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium">Hábitos Activos</span>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{kpiData.totalHabits}</div>
        <p className="text-xs text-muted-foreground mt-1">
          Hábitos en seguimiento
        </p>
      </div>
    </div>
  );
}
