import Date from "@/components/Elements/General/CurrentDate";
import Animate from "@/components/Pages/Dashboard/Animate";
import Pomodoro from "../Elements/General/PomodoroComponent";
import Habits from "@/components/Pages/Dashboard/Habits";
import Agenda from "@/components/Pages/Dashboard/Agenda";
import TusTask from "@/components/Pages/Dashboard/YourTask";

import { getMyTask } from "@/services/Task/getMyTask";
import { getEventsCalendar } from "@/services/Calendar/getEventsCalendar";

export default async function Dashboard() {
  const tasks = await getMyTask();
  const events = await getEventsCalendar();

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-9 gap-4 w-full h-full p-5">
      <Date />
      <Animate />
      <Pomodoro />
      <TusTask tasks={tasks} />
      <Habits />
      <Agenda events={events} />
    </div>
  );
}
