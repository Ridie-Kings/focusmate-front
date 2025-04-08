import Date from "@/components/Elements/General/CurrentDate";
import Animate from "@/components/Pages/Dashboard/Animate";
import Pomodoro from "@/components/Pages/Dashboard/Pomodoro";
import Habits from "@/components/Pages/Dashboard/Habits";
import Agenda from "@/components/Pages/Dashboard/Agenda";
import TusTask from "@/components/Pages/Dashboard/Task";

import { getMyTask } from "@/services/Task/getMyTask";
import { getMyHabits } from "@/services/Habits/getMyHabits";

export default async function Dashboard() {
  const tasks = await getMyTask();
  const habits = await getMyHabits();

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-9 gap-4 w-full h-full p-5">
      <Date />
      <Animate />
      <Pomodoro />
      <TusTask tasks={tasks.success ? tasks.res : []} />
      <Habits habits={habits.success ? habits.res : []} />
      <Agenda />
    </div>
  );
}
