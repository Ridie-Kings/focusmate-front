"use client";

import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import { GetGlobalInfo } from "@/services/MyStats/GetGlobalInfo";

interface TopUsersProps {
  selectedUser?: string | null;
  viewMode: "personal" | "global";
}

interface TopUserData {
  username: string;
  completedTasks: number;
}

export function TopUsers({ viewMode }: TopUsersProps) {
  const [topUsers, setTopUsers] = useState<TopUserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTopUsers = async () => {
      if (viewMode !== "global") {
        setTopUsers([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, success } = await GetGlobalInfo();

        if (!success) {
          throw new Error(`Error en la API: ${data}`);
        }

        setTopUsers(data.topUsers || []);
      } catch (error) {
        console.error("Error loading top users:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    loadTopUsers();
  }, [viewMode]);

  if (viewMode !== "global") {
    return null;
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top Usuarios</h3>
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
        <h3 className="text-lg font-medium text-gray-900">Top Usuarios</h3>
      </div>
      <div className="p-6">
        {isLoading ? (
          <div className="p-4">Cargando usuarios...</div>
        ) : topUsers.length === 0 ? (
          <div className="p-4">No hay datos disponibles</div>
        ) : (
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <div
                key={user.username}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${
                      index === 0
                        ? "bg-yellow-200"
                        : index === 1
                        ? "bg-gray-200"
                        : index === 2
                        ? "bg-amber-700"
                        : "bg-blue-100"
                    }`}
                  >
                    <Trophy
                      className={`h-4 w-4
                      ${
                        index === 0
                          ? "text-yellow-600"
                          : index === 1
                          ? "text-gray-600"
                          : index === 2
                          ? "text-amber-900"
                          : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">
                      {user.completedTasks} tareas completadas
                    </p>
                  </div>
                </div>
                <div className="text-lg font-bold">#{index + 1}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
