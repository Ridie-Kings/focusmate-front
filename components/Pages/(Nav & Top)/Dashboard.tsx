import Date from "@/components/Elements/General/CurrentDate";
import Pomodoro from "@/components/Pages/(Nav & Top)/Dashboard/Pomodoro";
import Habits from "@/components/Pages/(Nav & Top)/Dashboard/Habits";
import Agenda from "@/components/Pages/(Nav & Top)/Dashboard/Agenda";
import TusTask from "@/components/Pages/(Nav & Top)/Dashboard/Task";

import { getMyTask } from "@/services/Task/getMyTask";
import { getMyHabits } from "@/services/Habits/getMyHabits";
import Streaks from "./Dashboard/Streaks";
import { getMyStreaks } from "@/services/Logs/getMyStreaks";

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-7 gap-4 w-full h-full md:px-5 py-5">
      <Date />
      {/* <Animate /> */}
      <StreaksWrapper />
      <Agenda />
      <PomodoroWrapper />
      <TasksWrapper />
      <HabitsWrapper />
    </div>
  );
}

async function PomodoroWrapper() {
  try {
    const tasks = await getMyTask();
    return <Pomodoro tasks={tasks.res} />;
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return <Pomodoro tasks={[]} />;
  }
}
async function StreaksWrapper() {
  try {
    const streaks = await getMyStreaks();
    return <Streaks number={streaks.res} />;
  } catch (error) {
    console.error("Failed to load streaks:", error);
    return <Streaks number={0} />;
  }
}

async function TasksWrapper() {
  try {
    const tasks = await getMyTask();
    return <TusTask tasksList={tasks.success ? tasks.res : []} />;
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return <TusTask tasksList={[]} />;
  }
}

async function HabitsWrapper() {
  try {
    const habits = await getMyHabits();
    return <Habits habitsList={habits.success ? habits.res : []} />;
  } catch (error) {
    console.error("Failed to load habits:", error);
    return <Habits habitsList={[]} />;
  }
}
