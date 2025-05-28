import { Pomodoro } from "@/interfaces/websocket/WebSocketProvider";

export default function HistoryTimerUtils() {
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

  function groupPomodororosByDate(pomodoros: Pomodoro[]) {
    const grouped: Record<string, Pomodoro[]> = {};

    pomodoros.reverse().forEach((pomodoro) => {
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

  function formatDuration(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (minutes === 0) {
      return `${seconds} segundo${seconds !== 1 ? "s" : ""}`;
    } else if (seconds === 0) {
      return `${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    } else {
      return `${minutes} min ${seconds} seg`;
    }
  }

  return {
    formatDateToSpanish,
    formatTime,
    groupPomodororosByDate,
    formatDuration,
  };
}
