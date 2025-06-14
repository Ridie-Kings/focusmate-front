import {
  addDays,
  startOfDay,
  startOfWeek,
  endOfDay,
  endOfWeek,
  getHours,
  getMinutes,
} from "date-fns";
import { useEffect, useRef } from "react";
import Divider from "@/components/Elements/General/Divider";
import TimeLeftBar from "@/components/Elements/Calendar/TimeLeftBar";
import TimeBar from "@/components/Elements/Calendar/TimeBar";
import { useDate } from "@/stores/calendarStore";
import DayColumn from "./WeekCalendar/DayColumn";

export const getNowPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return 24 + hours * 2 * 68 + minutes * (68 / 30);
};

// const findOverlappingEvents = (
//   events: TimelineItem[],
//   currentEvent: TimelineItem
// ) => {
//   return events.filter((event) => {
//     const currentStart = new Date(event.startDate).getTime();
//     const currentEnd = new Date(event.data.endDate).getTime();
//     const eventStart = new Date(currentEvent.startDate).getTime();
//     const eventEnd = new Date(currentEvent.data.endDate).getTime();

//     return (
//       (currentStart <= eventEnd && currentEnd >= eventStart) ||
//       (eventStart <= currentEnd && eventEnd >= currentStart)
//     );
//   });
// };

export default function WeekCalendar() {
  const date = useDate() ?? new Date();
  const scrollCalendar = useRef<HTMLDivElement>(null);

  const startDate = startOfDay(startOfWeek(date, { weekStartsOn: 1 }));
  const endDate = endOfDay(endOfWeek(date, { weekStartsOn: 1 }));

  const days = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  useEffect(() => {
    if (scrollCalendar.current) {
      scrollCalendar.current.scrollTo(0, 750);
    }
  }, [scrollCalendar]);

  return (
    <div
      ref={scrollCalendar}
      className="grid grid-cols-8 w-full rounded-xl relative gap-2 overflow-y-auto overflow-x-hidden h-[calc(100vh-152px)]"
    >
      <div className="flex flex-col gap-5 relative">
        <div
          className={`text-sm flex flex-col text-transparent py-2 border-2 border-transparent pointer-events-none`}
        >
          Don &apos;t look
          <Divider backgroundColor="white" />
          at the code
        </div>
        <TimeLeftBar length={49} divider={2} calc={1} />
      </div>
      <TimeBar pos={getNowPosition(new Date()) + 71} />
      {days.map((day, index) => (
        <DayColumn key={index} day={day} selectedDate={date} />
      ))}
    </div>
  );
}
