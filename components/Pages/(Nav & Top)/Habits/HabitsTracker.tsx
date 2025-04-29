import CircleProgressBar from "@/components/Elements/General/HabitsElements/CircleProgress";
import { useState } from "react";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";

export default function HabitsTracker({
  porcent,
  doneCount,
  items,
}: {
  porcent: number;
  doneCount: number;
  items: HabitsType[];
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-1/2 flex flex-col place-content-between p-5">
      <CircleProgressBar
        percent={porcent}
        doneCount={doneCount}
        habits={items}
      />
      <SmallCalendar
        date={date ?? new Date()}
        setDate={setDate}
        className="border-2 rounded-lg p-2"
      />
    </div>
  );
}
