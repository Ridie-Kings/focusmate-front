"use client";
import { useState, useEffect } from "react";
import { GetAllMyPomodoro } from "@/services/Pomodoro/GetAllMyPomodoro";
import { Calendar, Clock } from "lucide-react";
import { Pomodoro } from "@/interfaces/websocket/WebSocketProvider";
import LoadingStatus from "@/components/Elements/General/LoadingStatus";
import HistoryTimerUtils from "@/lib/HistoryTimerUtils";
import { useTranslations } from "next-intl";

export default function HistoryTimer() {
  const t = useTranslations("Dashboard.pomodoro.history.state");

  const [historyPomodoro, setHistoryPomodoro] = useState<Pomodoro[]>([]);
  const [groupedPomodoros, setGroupedPomodoros] = useState<
    Record<string, Pomodoro[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  const {
    formatDateToSpanish,
    formatTime,
    groupPomodororosByDate,
    formatDuration,
  } = HistoryTimerUtils();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetAllMyPomodoro();
        setHistoryPomodoro(data.res);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-1">
        <LoadingStatus text="historial" />
      </div>
    );
  }

  if (historyPomodoro.length === 0) {
    return (
      <div className="flex-1 text-center py-8">
        No se encontraron pomodoros en el historial.
      </div>
    );
  }

  return (
    <div
      style={{ maxHeight: "calc(100vh - 48px)" }}
      className="flex-1 max-w-4xl overflow-y-auto mx-auto px-4 py-6"
    >
      <h1 className="text-2xl font-bold mb-6">Historial de Pomodoros</h1>

      {Object.entries(groupedPomodoros).map(([date, pomodoros]) => (
        <div key={date} className="mb-8">
          <div className="sticky top-0 flex items-center gap-2 mb-3 bg-gray-100 p-3 rounded-lg">
            <Calendar className="text-secondary-600" />
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
                className="flex items-center p-3 border-l-4 border-secondary-500 rounded-lg bg-gray-50"
              >
                <Clock className="mr-2 text-gray-500" size={18} />
                <span className="text-gray-700 font-medium">
                  {formatTime(new Date(pomodoro.startAt))}
                </span>
                <span className="mx-3">-</span>
                <span className="text-gray-600">
                  {(() => {
                    const totalSeconds =
                      pomodoro.currentCycle !== 0
                        ? (pomodoro.workDuration / 60) *
                          pomodoro.currentCycle *
                          60
                        : pomodoro.workDuration - pomodoro.remainingTime;

                    return formatDuration(totalSeconds);
                  })()}
                </span>
                {pomodoro.task?.title && (
                  <>
                    <span className="mx-3">-</span>
                    <span className="text-gray-600">
                      {pomodoro.task?.title}
                    </span>
                  </>
                )}
                {pomodoro.state && (
                  <span
                    className={`ml-auto   px-2 py-1 rounded-full text-xs ${
                      pomodoro.state === "working"
                        ? "bg-amber-100 text-amber-800"
                        : pomodoro.state === "finished"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {t(pomodoro.state)}
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
