import CircleProgressBar from "@/components/Elements/General/HabitsElements/CircleProgress";
import { useState } from "react";
import { itemsType } from "@/components/Pages/Habits";
import Calendar from "@/components/Elements/General/Calendar";

export default function HabitsTracker({
  porcent,
  doneCount,
  items,
}: {
  porcent: number;
  doneCount: number;
  items: itemsType[];
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-1/2 flex flex-col place-content-between p-5">
      <CircleProgressBar
        percent={porcent}
        doneCount={doneCount}
        habits={items}
      />
      <Calendar
        date={date}
        setDate={setDate}
        className="border-2 rounded-lg p-2"
      />
    </div>
  );
}
