import CircleProgressBar from "../General/HabitsElements/CircleProgress";
import Calendar from "../General/Calendar";
import { itemsType } from "../Dashboard/Habits";
import { useState } from "react";

export default function HabitsTracker({
  porcent,
  doneCount,
  items,
}: {
  porcent: number;
  doneCount: number;
  items: itemsType[];
}) {
  const [date, setDate] = useState(new Date());

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
