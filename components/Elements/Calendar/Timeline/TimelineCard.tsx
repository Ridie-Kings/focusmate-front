import { useModalStore } from "@/stores/modalStore";
import Menu from "@/components/Reusable/Menu";
import AgendaUtils from "@/lib/AgendaUtils";
import { Calendar, Check, ClipboardCheck, Pen, Trash2 } from "lucide-react";
import { useDashboardStore } from "@/stores/dashboardStore";
import { EventType } from "@/interfaces/Calendar/EventType";
import { TaskType } from "@/interfaces/Task/TaskType";
import { useToastStore } from "@/stores/toastStore";

export type TimelineItem = {
  type: "event" | "task";
  data: EventType | TaskType;
};

export default function TimelineCard({ items }: { items: TimelineItem }) {
  const { isLightColor, getDarkerColor, formatDuration } = AgendaUtils();
  const { removeEvent, updateTask, removeTask } = useDashboardStore(
    (state) => state.actions
  );
  const { addToast } = useToastStore();

  const { setIsOpen } = useModalStore((state) => state.actions);

  const isEvent = items.type === "event";
  const data = items.data;

  const handleUpdate = () => {
    if (isEvent) {
      setIsOpen({ text: "event", other: data });
    } else {
      setIsOpen({ text: "task", other: data });
    }
  };

  const handleRemove = async () => {
    if (isEvent) {
      const res = await removeEvent(data._id);
      if (res.success) {
        addToast({
          message: "Evento eliminado correctamente",
          description: "El evento ha sido eliminado correctamente",
          type: "success",
        });
      } else {
        addToast({
          message: "Error al eliminar el evento",
          type: "error",
          description: res.res as string,
        });
      }
    } else {
      const res = await removeTask(data._id);
      if (res.success) {
        addToast({
          message: "Tarea eliminada correctamente",
          description: "La tarea ha sido eliminada correctamente",
          type: "success",
        });
      } else {
        addToast({
          message: "Error al eliminar la tarea",
          type: "error",
          description: res.res as string,
        });
      }
    }
  };

  const handleComplete = () => {
    if (!isEvent) {
      updateTask(data._id, {
        status:
          (data as TaskType).status === "completed" ? "dropped" : "completed",
      });
    }
  };

  const textColor = isLightColor(data.color) ? "text-black" : "text-white";
  const darkerColor = getDarkerColor(data.color);

  return (
    <div
      style={{
        backgroundColor:
          !isEvent && (data as TaskType).status === "completed"
            ? ""
            : data.color,
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
        <p className="font-medium">{data.title}</p>
        {!isEvent && (
          <div className="flex items-center justify-between w-full">
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
            <p className={`text-xs font-medium ${textColor}`}>Empieza</p>
          </span>

          <p
            style={{ backgroundColor: darkerColor }}
            className="px-2 h-3/4 font-medium text-xs flex items-center rounded-sm text-white"
          >
            {formatDuration(data.startDate, data.endDate)}
          </p>

          <span className="flex flex-col items-center gap-1">
            <p className="text-sm">
              {new Date(data.endDate).toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className={`text-xs font-medium ${textColor}`}>Termina</p>
          </span>
        </div>
      )}

      <Menu
        className="absolute right-3 top-4"
        items={[
          {
            label: "Modificar",
            icon: <Pen size={20} />,
            onClick: handleUpdate,
          },
          {
            label: "Hecho",
            icon: <Check size={20} />,
            onClick: handleComplete,
          },
          {
            label: "Eliminar",
            color: "red",
            icon: <Trash2 size={20} />,
            onClick: handleRemove,
          },
        ]}
      />
    </div>
  );
}
