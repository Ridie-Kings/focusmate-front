import { TaskType } from "@/interfaces/Task/TaskType";
import { differenceInMinutes } from "date-fns";

export default function TimelineCard({ event }: { event: TaskType }) {
  const formatDuration = (start: Date, end: Date) => {
    const totalMinutes = Math.abs(differenceInMinutes(end, start));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")} min`;
    }
    return `${minutes}min`;
  };

  return (
    <div className="w-full h-26 bg-primary-500 text-white px-2 py-4 rounded-lg flex flex-col justify-between transition-all duration-300 ease-in-out">
      <p>{event.title}</p>
      <div className="flex items-center justify-between w-full">
        <span className="flex flex-col items-center gap-1">
          <p className="text-sm">
            {new Date(event.startDate).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-xs text-white font-medium">Empieza</p>
        </span>
        <p className="bg-secondary-700 px-2 h-3/4 font-medium text-xs flex items-center rounded-sm text-black">
          {formatDuration(event.startDate, event.dueDate)}
        </p>
        <span className="flex flex-col items-center gap-1">
          <p className="text-sm">
            {new Date(event.dueDate).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-xs text-white font-medium">Termina</p>
        </span>
      </div>
    </div>
  );
}
