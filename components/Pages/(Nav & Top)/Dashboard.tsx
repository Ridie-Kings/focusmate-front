import Date from "@/components/Elements/General/CurrentDate";
import Pomodoro from "@/components/Pages/(Nav & Top)/Dashboard/Pomodoro";
import Habits from "@/components/Pages/(Nav & Top)/Dashboard/Habits";
import Agenda from "@/components/Pages/(Nav & Top)/Dashboard/Agenda";
import TusTask from "@/components/Pages/(Nav & Top)/Dashboard/Task";

import { getMyTask } from "@/services/Task/getMyTask";
import { getMyHabits } from "@/services/Habits/getMyHabits";
import Streaks from "./Dashboard/Streaks";
import { getMyStreaks } from "@/services/Logs/getMyStreaks";

export default async function Dashboard() {
  const tasks = await getMyTask();
  const habits = await getMyHabits();
  const streaks = await getMyStreaks();

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-9 gap-4 w-full h-full p-5">
      <Date />
      {/* <Animate /> */}
      <Streaks number={streaks.res} />
      <Agenda />
      <Pomodoro />
      <TusTask tasksList={tasks.success ? tasks.res : []} />
      <Habits habitsList={habits.success ? habits.res : []} />
    </div>
  );
}
