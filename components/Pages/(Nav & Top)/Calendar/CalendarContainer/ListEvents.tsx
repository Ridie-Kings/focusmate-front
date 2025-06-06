import { EllipsisVertical } from "lucide-react";
import Dot from "@/components/Elements/General/Dot";
import { TaskType } from "@/interfaces/Task/TaskType";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function ListEvents({ items }: { items: TaskType[] }) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        No hay eventos programados
      </div>
    );
  }

  const groupedEvents = items.reduce((acc, event) => {
    const date = new Date(event.startDate);
    const dayKey = format(date, "yyyy-MM-dd");
    if (!acc[dayKey]) {
      acc[dayKey] = [];
    }
    acc[dayKey].push(event);
    return acc;
  }, {} as Record<string, TaskType[]>);

  return (
    <ul className="flex flex-col gap-2 h-full flex-1 w-full overflow-y-auto px-2">
      {Object.entries(groupedEvents).map(([dayKey, dayEvents]) => (
        <li key={dayKey} className="flex flex-col gap-2">
          <h3 className="capitalize px-3 py-1">
            {format(new Date(dayKey), "EEEE d 'de' MMMM", { locale: es })}
          </h3>
          {dayEvents.map((item) => (
            <div
              key={item._id}
              className="flex w-full justify-between items-center px-3 group"
            >
              <div className="flex gap-4 items-center">
                <Dot size={15} backgroundColor={item.color} />
                <div className="flex items-center gap-3">
                  <label className="text-sm">{item.title}</label>
                  {item.description && (
                    <span className="text-xs text-gray-400 line-clamp-1">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <EllipsisVertical
                  size={18}
                  className="text-black hover:text-gray-400 cursor-pointer"
                />
              </button>
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
