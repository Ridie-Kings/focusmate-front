import Menu from "@/components/Reusable/Menu";
import AgendaUtils from "@/lib/AgendaUtils";
import { Calendar, Check, ClipboardCheck, Pen, Trash2 } from "lucide-react";
import { EventType } from "@/interfaces/Calendar/EventType";
import { TaskType } from "@/interfaces/Task/TaskType";
import TimelineUtils from "@/lib/TimelineUtils";

export type TimelineItem = {
  type: "event" | "task";
  data: EventType | TaskType;
  startDate: Date;
};

export default function TimelineCard({
  item,
  hasOverlappingEvents,
}: {
  item: TimelineItem;
  hasOverlappingEvents: boolean;
}) {
  const { isLightColor, getDarkerColor, formatDuration } = AgendaUtils();

  const { handleComplete, handleRemove, handleUpdate } = TimelineUtils();

  const isEvent = item.type === "event";
  const data = item.data;

  const textColor = isLightColor(data.color) ? "text-black" : "text-white";
  const darkerColor = getDarkerColor(data.color);

  return (
    <div
      style={{
        backgroundColor:
          (data as TaskType).status === "completed"
            ? ""
            : data.color !== ""
            ? data.color
            : "#000000",
      }}
      className={`w-full p-4 rounded-lg relative flex flex-col justify-between transition-all duration-300 ease-in-out ${textColor} ${
        isEvent ? "h-26" : "h-14"
      } ${
        !isEvent && (data as TaskType).status === "completed"
          ? "border-2 border-gray-500"
          : ""
      }`}
    >
      <div className="flex items-center gap-2">
        {isEvent ? <Calendar size={20} /> : <ClipboardCheck size={20} />}
        <p className="font-medium truncate">{data.title}</p>
        {!isEvent && !hasOverlappingEvents && (
          <div className="flex items-center justify-between">
            <p className="text-sm">
              Limite:{" "}
              {new Date((data as TaskType).dueDate).toLocaleTimeString(
                "es-ES",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>
        )}
      </div>
      {isEvent && (
        <div className="flex items-center justify-between w-full">
          <span className="flex flex-col items-center gap-1">
            <p className="text-sm">
              {new Date(data.startDate).toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {!hasOverlappingEvents && (
              <p className={`text-xs font-medium ${textColor}`}>Empieza</p>
            )}
          </span>

          {!hasOverlappingEvents && (
            <p
              style={{ backgroundColor: darkerColor }}
              className="px-2 h-3/4 font-medium text-xs flex items-center rounded-sm text-white"
            >
              {formatDuration(data.startDate, data.endDate)}
            </p>
          )}

          <span className="flex flex-col items-center gap-1">
            <p className="text-sm">
              {new Date(data.endDate).toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {!hasOverlappingEvents && (
              <p className={`text-xs font-medium ${textColor}`}>Termina</p>
            )}
          </span>
        </div>
      )}

      <Menu
        className="absolute right-3 top-4"
        items={[
          {
            label: "Modificar",
            icon: <Pen size={20} />,
            onClick: () => handleUpdate({ item }),
          },
          {
            label: "Hecho",
            icon: <Check size={20} />,
            onClick: () => handleComplete({ item }),
          },
          {
            label: "Eliminar",
            color: "red",
            icon: <Trash2 size={20} />,
            onClick: () => handleRemove({ item }),
          },
        ]}
      />
    </div>
  );
}
