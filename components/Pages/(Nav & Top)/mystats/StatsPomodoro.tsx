"use client";
import TemplateBox from "@/components/Elements/General/TemplateBox";
import SelectTimeButtons from "@/components/Elements/Stats/SelectTimeButtons";
import { PromiseGetPomodoroStats } from "@/interfaces/Dashboard/DashboardType";
import { useState } from "react";

export default function StatsPomodoro({
  stats,
}: {
  stats: PromiseGetPomodoroStats;
}) {
  const [selectedMonth, setSelectedMonth] = useState("enero-febrero");
  const [selectedYear, setSelectedYear] = useState("2025");

  const categorias = [
    { label: "Completadas", color: "#248277" },
    { label: "No Completadas", color: "#c0abc1" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <TemplateBox grid="" title="Pomodoro" link="/">
        <SelectTimeButtons
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        <ul className="w-full grid grid-cols-4">
          {categorias.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-center gap-2 text-sm"
            >
              <div
                style={{ backgroundColor: item.color }}
                className="size-4 rounded-full"
              />
              <p>{item.label}</p>
            </li>
          ))}
        </ul>
      </TemplateBox>
      <div className="flex flex-col w-full gap-4 text-sm text-primary-500">
        <div className="flex w-full px-4 place-content-between">
          <p>Tiempo total concentrado</p>
          <p>{stats.totalTimeFormatted}</p>
        </div>
        <div className="flex w-full px-4 place-content-between">
          <p>Sesiones Iniciadas</p>
          <p>{stats.totalTimeFormatted}</p>
        </div>
        <div className="flex w-full px-4 place-content-between">
          <p>Pausas Activadas Manualmente</p>
          <p>{stats.totalTimeFormatted}</p>
        </div>
        <div className="flex w-full px-4 place-content-between">
          <p>Mejor Racha Pomodoros</p>
          <p>{stats.totalTimeFormatted}</p>
        </div>
      </div>
    </div>
  );
}
