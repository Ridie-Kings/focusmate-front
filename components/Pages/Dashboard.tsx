import Date from "@/components/Elements/Dashboard/Date";
import Animate from "@/components/Elements/Dashboard/Animate";
import Pomodoro from "../Elements/Dashboard/Pomodoro";
import Habits from "../Elements/Dashboard/Habits";
import Agenda from "../Elements/Dashboard/Agenda";
import TusTareas from "../Elements/Dashboard/TusTareas";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 grid-rows-9 gap-4 w-full h-full p-5">
      <Date />
      <Animate />
      <Pomodoro />
      <TusTareas />
      <Habits />
      <Agenda />
    </div>
  );
}
