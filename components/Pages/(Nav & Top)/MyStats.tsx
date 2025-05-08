import {
  AlarmClockCheck,
  BookText,
  FireExtinguisher,
  Hourglass,
  NotepadText,
} from "lucide-react";
import StatsCard from "./mystats/StatsCard";
import StatsTask from "./mystats/StatsTask";
import StatsPomodoro from "./mystats/StatsPomodoro";
import { GetMyStats } from "@/services/Dashboard/GetMyStats";
import StatsHabits from "./mystats/StatsHabits";

export default async function MyStats() {
  const info = await GetMyStats();

  const items = [
    {
      label: "Tareas Completadas",
      number: info.data.tasks.completedTasks.toString(),
      icon: <BookText />,
    },
    {
      label: "Ciclos Pomodoro",
      number: info.data.pomodoro.completedPomodoros.toString(),
      icon: <AlarmClockCheck />,
    },
    {
      label: "Habitos Completados",
      number: info.data.habits.completedToday.toString(),
      icon: <NotepadText />,
    },
    {
      label: "Tiempo estudiado",
      number: info.data.pomodoro.totalTimeFormatted.toString(),
      icon: <Hourglass />,
    },
    {
      label: "Streaks",
      number: info.data.userActivity.streak.toString(),
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
        <StatsTask stats={info.data.tasks} />
        <StatsPomodoro stats={info.data.pomodoro} />
      </div>
      <StatsHabits stats={info.data.habits} />
    </main>
  );
}
