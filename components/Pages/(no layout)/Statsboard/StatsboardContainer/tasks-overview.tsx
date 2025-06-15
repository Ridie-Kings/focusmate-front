"use client";

import { GetGlobalInfo } from "@/services/MyStats/GetGlobalInfo";
import { GetStatsBoardInfoUser } from "@/services/MyStats/GetStatsBoardInfoUser";
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import LoadingState from "@/components/Elements/General/LoadingState";

interface TasksOverviewProps {
  selectedUser?: string | null;
  viewMode: "personal" | "global";
}

interface RecentTask {
  title: string;
  category?: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  status: "completed" | "pending";
}

interface TasksData {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  tasksByCategory: Record<string, number>;
  tasksByPriority: {
    high: number;
    medium: number;
    low: number;
  };
  recentTasks: RecentTask[];
}

export function TasksOverview({ selectedUser, viewMode }: TasksOverviewProps) {
  const [tasksData, setTasksData] = useState<TasksData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasksData = async () => {
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

        if (
          viewMode === "personal" ||
          (viewMode === "global" && !selectedUser)
        ) {
          const tasksInfo =
            viewMode === "personal"
              ? data.tasks
              : {
                  totalTasks: data.summary.totalTasks,
                  completedTasks: data.summary.completedTasks,
                  pendingTasks:
                    data.summary.totalTasks - data.summary.completedTasks,
                  tasksByCategory: {},
                  tasksByPriority: {
                    high: 0,
                    medium: 0,
                    low: 0,
                  },
                  recentTasks: [],
                };

          setTasksData(tasksInfo);
        }
      } catch (error) {
        console.error("Error loading tasks data:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    loadTasksData();
  }, [selectedUser, viewMode]);

  const preparePieChartData = (data: Record<string, number>) => {
    return Object.entries(data).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28DFF",
    "#FF6B6B",
  ];

  const PRIORITY_COLORS = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981",
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Resumen de Tareas
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Resumen de Tareas
          </h3>
        </div>
        <div className="p-6">
          <LoadingState variant="skeleton" text="Cargando datos..." />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Estado de Tareas
          </h3>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-80">
              <p>Cargando datos...</p>
            </div>
          ) : !tasksData ? (
            <div className="flex items-center justify-center h-80">
              <p>No hay datos disponibles</p>
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Completadas",
                        value: tasksData.completedTasks,
                      },
                      {
                        name: "Pendientes",
                        value: tasksData.pendingTasks,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#4ade80" />
                    <Cell fill="#f87171" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {viewMode === "personal" && tasksData?.tasksByCategory && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Tareas por Categoría
            </h3>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-80">
                <p>Cargando datos...</p>
              </div>
            ) : Object.keys(tasksData.tasksByCategory).length === 0 ? (
              <div className="flex items-center justify-center h-80">
                <p>No hay categorías definidas</p>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={preparePieChartData(tasksData.tasksByCategory)}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {preparePieChartData(tasksData.tasksByCategory).map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === "personal" && tasksData?.tasksByPriority && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Tareas por Prioridad
            </h3>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-80">
                <p>Cargando datos...</p>
              </div>
            ) : Object.values(tasksData.tasksByPriority).every(
                (val) => val === 0
              ) ? (
              <div className="flex items-center justify-center h-80">
                <p>No hay datos de prioridad disponibles</p>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Alta",
                          value: tasksData.tasksByPriority.high,
                        },
                        {
                          name: "Media",
                          value: tasksData.tasksByPriority.medium,
                        },
                        {
                          name: "Baja",
                          value: tasksData.tasksByPriority.low,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      <Cell fill={PRIORITY_COLORS.high} />
                      <Cell fill={PRIORITY_COLORS.medium} />
                      <Cell fill={PRIORITY_COLORS.low} />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === "personal" && tasksData?.recentTasks && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden md:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Tareas Recientes
            </h3>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="p-4">Cargando tareas recientes...</div>
            ) : tasksData.recentTasks.length === 0 ? (
              <div className="p-4">No hay tareas recientes</div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-3 text-left font-medium">Título</th>
                      <th className="p-3 text-left font-medium">Categoría</th>
                      <th className="p-3 text-left font-medium">Prioridad</th>
                      <th className="p-3 text-left font-medium">
                        Fecha límite
                      </th>
                      <th className="p-3 text-left font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasksData.recentTasks.map((task, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3">{task.title}</td>
                        <td className="p-3">
                          {task.category || "Sin categoría"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs
                            ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.priority === "high"
                              ? "Alta"
                              : task.priority === "medium"
                              ? "Media"
                              : "Baja"}
                          </span>
                        </td>
                        <td className="p-3">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs
                            ${
                              task.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {task.status === "completed"
                              ? "Completada"
                              : "Pendiente"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
