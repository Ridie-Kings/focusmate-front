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

// const Pomodoro = dynamic(
//   () => import("@/components/Pages/(Nav & Top)/Dashboard/Pomodoro"),
//   {
//     loading: () => <div>Loading...</div>,
//   }
// );

// const Habits = dynamic(
//   () => import("@/components/Pages/(Nav & Top)/Dashboard/Habits"),
//   {
//     loading: () => <div>Loading...</div>,
//   }
// );

// const Agenda = dynamic(
//   () => import("@/components/Pages/(Nav & Top)/Dashboard/Agenda"),
//   {
//     loading: () => <div>Loading...</div>,
//   }
// );

// const TusTask = dynamic(
//   () => import("@/components/Pages/(Nav & Top)/Dashboard/Task"),
//   {
//     loading: () => <div>Loading...</div>,
//   }
// );

// const Streaks = dynamic(() => import("./Dashboard/Streaks"), {
//   loading: () => <div>Loading...</div>,
// });

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
