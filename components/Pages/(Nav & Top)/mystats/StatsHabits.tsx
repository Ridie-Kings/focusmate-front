"use client";
import TemplateBox from "@/components/Elements/General/TemplateBox";
import SelectTimeButtons from "@/components/Elements/Stats/SelectTimeButtons";
import { PromiseGetHabitsStats } from "@/interfaces/Dashboard/DashboardType";
import { useState } from "react";

export default function StatsHabits({
  stats,
}: {
  stats: PromiseGetHabitsStats;
}) {
  const [selectedMonth, setSelectedMonth] = useState("enero-febrero");
  const [selectedYear, setSelectedYear] = useState("2025");
  console.log(stats);

  return (
    <TemplateBox grid="" title="Habits" link="/">
      <SelectTimeButtons
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      <div className="flex gap-4">
        <div className="w-3/5 grid grid-cols-30 grid-rows-6 gap-2">
          {Array(180)
            .fill(null)
            .map((index) => (
              <div key={index} className="size-5 bg-primary-500 rounded" />
            ))}
        </div>
        <div className="w-2/5 text-sm text-primary-500 flex flex-col justify-center gap-2">
          <div className="flex w-full place-content-between">
            <p>Tiempo total Concentrado </p>
            <p>10</p>
          </div>
          <div className="flex w-full place-content-between">
            <p>Sesiones Iniciadas</p>
            <p>15</p>
          </div>
          <div className="flex w-full place-content-between">
            <p>Pausas Activadas Manualmente </p>
            <p>50</p>
          </div>
          <div className="flex w-full place-content-between">
            <p>Mejor Racha Activa </p>
            <p>20</p>
          </div>
        </div>
      </div>
    </TemplateBox>
  );
}
