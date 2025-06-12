import { TimelineItem } from "../../Calendar/Timeline/TimelineCard";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Check, ClipboardCheck, Pen, Trash2 } from "lucide-react";
import { TaskType } from "@/interfaces/Task/TaskType";
import Menu from "@/components/Reusable/Menu";
import TimelineUtils from "@/lib/TimelineUtils";
import AgendaUtils from "@/lib/AgendaUtils";

export default function ModalShowMore({ list }: { list: TimelineItem[] }) {
  const { handleComplete, handleRemove, handleUpdate } = TimelineUtils();
  const { isLightColor } = AgendaUtils();

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {list.map((item) => {
        const textColor = isLightColor(item.data.color) ? "black" : "white";

        return (
          <div
            key={item.data._id}
            className="w-full p-4 rounded-lg flex flex-col gap-2 relative"
            style={{
              backgroundColor: item.data.color || "#000000",
              color: textColor,
            }}
          >
            <div className="flex items-center gap-2">
              {item.type === "event" ? (
                <Calendar size={20} />
              ) : (
                <ClipboardCheck size={20} />
              )}
              <h3 className="font-medium">{item.data.title}</h3>
            </div>

            {item.type === "event" ? (
              <div className="flex flex-col gap-1 text-sm">
                <p>
                  {format(new Date(item.data.startDate), "HH:mm", {
                    locale: es,
                  })}{" "}
                  -{" "}
                  {format(new Date(item.data.endDate), "HH:mm", { locale: es })}
                </p>
                {item.data.description && (
                  <p className="text-sm opacity-80">{item.data.description}</p>
                )}
                {"location" in item.data && item.data.location && (
                  <p className="text-sm opacity-80">📍 {item.data.location}</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-1 text-sm">
                <p>
                  Limite:{" "}
                  {format(new Date((item.data as TaskType).dueDate), "HH:mm", {
                    locale: es,
                  })}
                </p>
                {item.data.description && (
                  <p className="text-sm opacity-80">{item.data.description}</p>
                )}
                {"priority" in item.data && item.data.priority && (
                  <p className="text-sm opacity-80">
                    Prioridad: {item.data.priority}
                  </p>
                )}
              </div>
            )}
            <Menu
              className="absolute right-3 top-4"
              items={[
                {
                  label: "Modificar",
                  icon: <Pen size={20} />,
                  onClick: () =>
                    handleUpdate({
                      item,
                      redirect: { text: "show-more", other: list },
                    }),
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
      })}
    </div>
  );
}
