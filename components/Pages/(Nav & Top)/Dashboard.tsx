"use client";
import CurrentDate from "@/components/Elements/General/CurrentDate";
import Pomodoro from "@/components/Pages/(Nav & Top)/Dashboard/Pomodoro";
import Habits from "@/components/Pages/(Nav & Top)/Dashboard/Habits";
import Agenda from "@/components/Pages/(Nav & Top)/Dashboard/Agenda";
import TusTask from "@/components/Pages/(Nav & Top)/Dashboard/Task";
import Streaks from "./Dashboard/Streaks";
import { useDashboardData } from "@/hooks/UserDashboardData";
import { useTour } from "@/hooks/UseTour";
import { useDashboardStore } from "@/stores/dashboardStore";

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

      <TusTask tasksList={tasks} />

      <Habits habitsList={habits} />
    </div>
  );
}
