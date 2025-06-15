import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";
import Menu from "@/components/Reusable/Menu";
import { TaskType } from "@/interfaces/Task/TaskType";
import AgendaUtils from "@/lib/AgendaUtils";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useModalStore } from "@/stores/modalStore";
import { differenceInHours, format } from "date-fns";
import { Pen, Trash2 } from "lucide-react";

export default function CalendarItem({
  calendarItem,
  eventStartPosition,
  eventEndPosition,
}: {
  calendarItem: TimelineItem;
  eventStartPosition: number;
  eventEndPosition: number;
}) {
  const calendarData = calendarItem.data;
  const isEvent = calendarItem.type === "event";
  const { setIsOpen } = useModalStore((state) => state.actions);
  const { isLightColor } = AgendaUtils();
  const { removeEvent } = useDashboardStore((state) => state.actions);

  const textColor = isLightColor(calendarData.color)
    ? "text-black"
    : "text-white";

  const backgroundColor =
    calendarData.color !== "" ? calendarData.color : "#000000";
  const totalHeight = eventEndPosition - eventStartPosition;

  return (
    <div
      className={`absolute w-[95%] p-2 rounded-lg flex flex-col items-start place-content-between z-2 transition-all duration-500`}
      style={{
        backgroundColor,
        top: `${eventStartPosition}px`,
        height: `${eventEndPosition - eventStartPosition}px`,
      }}
    >
      <div className="w-full flex items-center place-content-between sticky top-15">
        <p className={`text-sm ${textColor}`}>{calendarData.title}</p>
        <Menu
          className={textColor}
          position={
            differenceInHours(calendarData.endDate, calendarData.startDate) < 1
              ? "top-right"
              : "bottom-right"
          }
          items={[
            {
              label: "Modificar",
              icon: <Pen size={20} />,
              onClick: () => setIsOpen({ text: "event", other: event }),
            },
            {
              label: "Eliminar",
              color: "red",
              icon: <Trash2 />,
              onClick: () => removeEvent(calendarData._id),
            },
          ]}
        />
      </div>
      {totalHeight > 100 && (
        <>
          {isEvent ? (
            <div
              style={{ backgroundColor }}
              className={`${textColor} flex place-content-between w-full text-xs p-1 z-1`}
            >
              <span>{format(calendarData.startDate, "HH:mm")} </span>
              <span>{format(calendarData.endDate, "HH:mm")} </span>
            </div>
          ) : (
            <div
              style={{ backgroundColor }}
              className={`${textColor} flex w-full items-center justify-center text-xs p-1 z-1`}
            >
              <span>
                {format((calendarData as TaskType).dueDate, "HH:mm")}{" "}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
