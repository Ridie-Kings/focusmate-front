"use client";
import CurrentDate from "@/components/Elements/General/CurrentDate";
import { useDashboardData } from "@/hooks/UserDashboardData";
import { useTour } from "@/hooks/UseTour";
import { useDashboardStore } from "@/stores/dashboardStore";
import Streaks from "./Dashboard/Streaks";
import Pomodoro from "./Dashboard/Pomodoro";
import Habits from "./Dashboard/Habits";
import Agenda from "./Dashboard/Agenda";
import Task from "./Dashboard/Task";

export default function Dashboard() {
  const { userInfo } = useDashboardStore();
  const { streaks, tasks, habits } = useDashboardData();

  useTour(userInfo);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-7 gap-4 w-full h-full md:px-5 py-5">
      <CurrentDate />
      <Streaks number={streaks} />
      <Agenda />
      <Pomodoro />
      <Task tasksList={tasks} />
      <Habits habitsList={habits} />
    </div>
  );
}
