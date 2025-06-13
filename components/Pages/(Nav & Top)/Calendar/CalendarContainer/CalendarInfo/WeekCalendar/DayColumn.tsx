import Divider from "@/components/Elements/General/Divider";
import CalendarUtils from "@/lib/CalendarUtils";
import { useCalendarStore } from "@/stores/calendarStore";
import { getDay, isSameDay, isToday } from "date-fns";
import { getNowPosition } from "../WeekCalendar";
import CalendarItem from "./DayColumn/CalendarItem";

const WeekDay = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"];

export default function DayColumn({
  day,
  selectedDate,
}: {
  day: Date;
  selectedDate: Date;
}) {
  const { setDate } = useCalendarStore((state) => state.actions);
  const { formatCalendar } = CalendarUtils({ navType: "week" });

  return (
    <div className="flex flex-col gap-5">
      <div
        onClick={() => setDate(day)}
        className={`flex cursor-pointer items-center place-content-between px-3 drop-shadow-lg text-center py-2 rounded-lg sticky top-0 z-10 ${
          isToday(day)
            ? "bg-primary-400 text-white"
            : isSameDay(day, selectedDate)
            ? " bg-secondary-700 text-white"
            : "bg-white text-primary-500 border border-primary-500"
        }`}
      >
        {WeekDay[getDay(day)]}
        <Divider width="1px" height="100%" />
        <p
          className={` text-white rounded-lg text-xl py-1 px-1.5 ${
            isToday(day) ? "bg-primary-500" : "bg-primary-400"
          }`}
        >
          {day.getDate().toString().padStart(2, "0")}
        </p>
      </div>
      <div
        className={`text-center p-1 h-full rounded-lg transition-all duration-200 relative`}
      >
        {formatCalendar
          .filter((calendarItem) => isSameDay(calendarItem.startDate, day))
          .map((calendarItem, i) => {
            const calendarData = calendarItem.data;
            const eventStartPosition = getNowPosition(calendarItem.startDate);
            const eventEndPosition = getNowPosition(calendarData.endDate);

            // const overlappingEvents = findOverlappingEvents(
            //   formatCalendar.filter((item) =>
            //     isSameDay(item.data.startDate, day)
            //   ),
            //   calendarItem
            // );
            // const eventIndex = overlappingEvents.findIndex(
            //   (event) => event === calendarItem
            // );

            return (
              <CalendarItem
                key={i}
                calendarItem={calendarItem}
                eventStartPosition={eventStartPosition}
                eventEndPosition={eventEndPosition}
              />
            );
          })}
      </div>
    </div>
  );
}
