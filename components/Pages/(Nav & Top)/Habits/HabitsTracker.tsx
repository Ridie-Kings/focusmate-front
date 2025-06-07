import CircleProgressBar from "@/components/Elements/General/HabitsElements/CircleProgress";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";
import { useDate } from "@/stores/calendarStore";

export default function HabitsTracker({
  porcent,
  doneCount,
  items,
}: {
  porcent: number;
  doneCount: number;
  items: HabitsType[];
}) {
  const date = useDate();

  return (
    <div className="w-1/2 flex flex-col place-content-between p-5">
      <CircleProgressBar
        percent={porcent}
        doneCount={doneCount}
        habits={items}
      />
      <SmallCalendar
        date={date ?? new Date()}
        className="border-2 rounded-lg p-2"
      />
    </div>
  );
}
