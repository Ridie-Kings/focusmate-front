import {
  AlarmClockCheck,
  BookText,
  FireExtinguisher,
  Hourglass,
  NotepadText,
} from "lucide-react";

import StatsCard from "./mystats/StatsCard";
import { GetUserLogs } from "@/services/User/GetUserLogs";
import StatsTask from "./mystats/StatsTask";

export default async function MyStats() {
  const userLogs = await GetUserLogs();

  const items = [
    {
      label: "Tareas Completadas",
      number: userLogs.res.Tasks.completedTasks,
      icon: <BookText />,
    },
    {
      label: "Ciclos Pomodoro",
      number: userLogs.res.Pomodoros.completedPomodoros,
      icon: <AlarmClockCheck />,
    },
    {
      label: "Habitos Completados",
      number: userLogs.res.Habits.activeHabits,
      icon: <NotepadText />,
    },
    {
      label: "Tiempo estudiado",
      number: userLogs.res.Pomodoros.totalTimeDone / 3600,
      icon: <Hourglass />,
    },
    {
      label: "Streaks",
      number: userLogs.res.Streak.currentStreak,
      icon: <FireExtinguisher />,
    },
  ];

  return (
    <main className="flex flex-col w-full h-full gap-6 p-6">
      <p className="text-primary-500 text-2xl">Informacion General</p>
      <div className="flex w-full gap-6">
        {items.map((item) => (
          <StatsCard key={item.label} item={item} />
        ))}
      </div>
      <div className="w-full grid grid-cols-2 gap-6">
        <StatsTask stats={userLogs.res.Tasks} />
        {/* <StatsPomodoro stats={info.data.pomodoro} /> */}
      </div>
      {/* <StatsHabits stats={info.data.habits} /> */}
    </main>
  );
}
