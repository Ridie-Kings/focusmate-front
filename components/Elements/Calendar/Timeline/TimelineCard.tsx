import { TaskType } from "@/interfaces/Task/TaskType";
import { differenceInMinutes } from "date-fns";

export default function TimelineCard({ event }: { event: TaskType }) {
  const formatDuration = (start: Date, end: Date) => {
    const totalMinutes = Math.abs(differenceInMinutes(end, start));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")} horas`;
    }
    return `${minutes} horas`;
  };

  const isLightColor = (color: string) => {
    let hex = color;
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }

    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else {
      return false;
    }

    const brightness = (299 * r + 587 * g + 114 * b) / 1000;

    return brightness > 128;
  };

  const textColor = isLightColor(event.color) ? "text-black" : "text-white";

  return (
    <div
      style={{ backgroundColor: event.color }}
      className={`w-full h-26 p-4 rounded-lg flex flex-col justify-between transition-all duration-300 ease-in-out ${textColor}`}
    >
      <p>{event.title}</p>
      <div className="flex items-center justify-between w-full">
        <span className="flex flex-col items-center gap-1">
          <p className="text-sm">
            {new Date(event.startDate).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className={`text-xs font-medium ${textColor}`}>Empieza</p>
        </span>
        <p className="bg-secondary-600 px-2 h-3/4 font-medium text-xs flex items-center rounded-sm text-white">
          {formatDuration(event.startDate, event.endDate)}
        </p>
        <span className="flex flex-col items-center gap-1">
          <p className="text-sm">
            {new Date(event.endDate).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className={`text-xs font-medium ${textColor}`}>Termina</p>
        </span>
      </div>
    </div>
  );
}
