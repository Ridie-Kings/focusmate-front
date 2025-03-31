import Date from "@/components/Elements/General/CurrentDate";
import Animate from "@/components/Elements/Pages/Dashboard/Animate";
import Pomodoro from "../Elements/General/PomodoroComponent";
import Habits from "@/components/Elements/Pages/Dashboard/Habits";
import Agenda from "@/components/Elements/Pages/Dashboard/Agenda";
import TusTask from "@/components/Elements/Pages/Dashboard/YourTask";
import { TaskType } from "@/interfaces/Task/TaskType";

export default async function Dashboard() {
  const tasks: TaskType[] = [];
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-9 gap-4 w-full h-full p-5">
      <Date />
      <Animate />
      <Pomodoro />
      <TusTask tasks={tasks} />
      <Habits />
      <Agenda />
    </div>
  );
}
