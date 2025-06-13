import { Pen, Trash2 } from "lucide-react";
import Dot from "@/components/Elements/General/Dot";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";
import CalendarUtils from "@/lib/CalendarUtils";
import Menu from "@/components/Reusable/Menu";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useModalStore } from "@/stores/modalStore";

export default function ListEvents() {
  const { formatCalendar } = CalendarUtils({ navType: "week" });
  const { removeEvent, removeTask } = useDashboardStore(
    (state) => state.actions
  );
  const { setIsOpen } = useModalStore((state) => state.actions);

  if (formatCalendar.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        No hay eventos programados
      </div>
    );
  }

  const groupedEvents = formatCalendar.reduce((acc, event) => {
    const date = new Date(event.startDate);
    const dayKey = format(date, "yyyy-MM-dd");
    if (!acc[dayKey]) {
      acc[dayKey] = [];
    }
    acc[dayKey].push(event);
    return acc;
  }, {} as Record<string, TimelineItem[]>);

  return (
    <ul className="flex flex-col gap-2 h-full w-full overflow-y-auto px-2">
      {Object.entries(groupedEvents).map(([dayKey, dayEvents]) => (
        <li key={dayKey} className="flex flex-col gap-2">
          <h3 className="capitalize px-3 py-1 sticky top-0 bg-white">
            {format(new Date(dayKey), "EEEE d 'de' MMMM", { locale: es })}
          </h3>
          {dayEvents.map((item) => (
            <div
              key={item.data._id}
              className="flex w-full justify-between items-center px-3 group"
            >
              <div className="flex gap-4 items-center">
                <Dot size={15} backgroundColor={item.data.color} />
                <div className="flex items-center gap-3">
                  <label className="text-sm">{item.data.title}</label>
                  {item.data.description && (
                    <span className="text-xs text-gray-400 line-clamp-1">
                      {item.data.description}
                    </span>
                  )}
                </div>
              </div>
              <Menu
                items={[
                  {
                    label: "Modificar",
                    icon: <Pen size={20} />,
                    onClick: () =>
                      setIsOpen({ text: item.type, other: item.data }),
                  },
                  {
                    label: "Eliminar",
                    color: "red",
                    icon: <Trash2 />,
                    onClick: () =>
                      item.type === "event"
                        ? removeEvent(item.data._id)
                        : removeTask(item.data._id),
                  },
                ]}
              />
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
