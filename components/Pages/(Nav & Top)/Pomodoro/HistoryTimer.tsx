"use client";
import { useState, useEffect } from "react";
import { GetAllMyPomodoro } from "@/services/Pomodoro/GetAllMyPomodoro";
import { Calendar, Clock } from "lucide-react";
import { Pomodoro } from "@/interfaces/websocket/WebSocketProvider";

export default function HistoryTimer() {
  const [historyPomodoro, setHistoryPomodoro] = useState<Pomodoro[]>([]);
  const [groupedPomodoros, setGroupedPomodoros] = useState<
    Record<string, Pomodoro[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetAllMyPomodoro();
        setHistoryPomodoro(data.res);
        console.log(data.res);
        
        const grouped = groupPomodororosByDate(data.res);
        setGroupedPomodoros(grouped);
      } catch (error) {
        console.error("Error al recuperar los pomodoros:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  function groupPomodororosByDate(pomodoros: Pomodoro[]) {
    const grouped: Record<string, Pomodoro[]> = {};

    pomodoros.forEach((pomodoro) => {
      if (!pomodoro.startAt) return;

      const date = new Date(pomodoro.startAt);
      const dateKey = date.toISOString().split("T")[0];

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(pomodoro);
    });

    return Object.fromEntries(
      Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]))
    );
  }

  function formatDateToSpanish(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  }

  function formatTime(date: Date): string {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isLoading) {
    return <div className="w-full text-center py-8">Cargando historial...</div>;
  }

  if (historyPomodoro.length === 0) {
    return (
      <div className="w-full text-center py-8">
        No se encontraron pomodoros en el historial.
      </div>
    );
  }

  return (
    <div
      style={{ maxHeight: "calc(100vh - 173px)" }}
      className="flex-1 max-w-4xl overflow-y-auto mx-auto px-4 py-6"
    >
      <h1 className="text-2xl font-bold mb-6">Historial de Pomodoros</h1>

      {Object.entries(groupedPomodoros).map(([date, pomodoros]) => (
        <div key={date} className="mb-8">
          <div className="flex items-center gap-2 mb-3 bg-gray-100 p-3 rounded-lg">
            <Calendar className="text-blue-600" />
            <h2 className="text-xl font-semibold capitalize">
              {formatDateToSpanish(date)}
            </h2>
            <span className="ml-auto text-gray-500">
              {pomodoros.length} pomodoro{pomodoros.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-3 pl-4">
            {pomodoros.map((pomodoro, index) => (
              <div
                key={index}
                className="flex items-center p-3 border-l-4 border-blue-500 rounded-lg bg-gray-50"
              >
                <Clock className="mr-2 text-gray-500" size={18} />
                <span className="text-gray-700 font-medium">
                  {formatTime(new Date(pomodoro.startAt))}
                </span>
                <span className="mx-3">-</span>
                <span className="text-gray-600">
                  {pomodoro.workDuration / 60} minutos
                </span>
                <span className="mx-3">-</span>
                <span className="text-gray-600">{pomodoro.task?.title ?? ""}</span>
                {pomodoro.state && (
                  <span className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {pomodoro.state}
                  </span>
                )}
                {/* <Menu items={[]} /> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
