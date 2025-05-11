"use client";
import TemplateBox from "@/components/Elements/General/TemplateBox";
import SelectTimeButtons from "@/components/Elements/Stats/SelectTimeButtons";
import { useState } from "react";
import CategoriesList from "./StatsTask/CategoriesList";
import StatsChard from "./StatsTask/StatsChard";
import { PromiseGetTasksStats } from "@/interfaces/Dashboard/DashboardType";

export default function StatsTask({ stats }: { stats: PromiseGetTasksStats }) {
  const [selectedMonth, setSelectedMonth] = useState("enero-febrero");
  const [selectedYear, setSelectedYear] = useState("2025");

  return (
    <div className="flex flex-col gap-4">
      <TemplateBox grid="" title="Tareas" link="/">
        <SelectTimeButtons
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        <CategoriesList />
        <StatsChard />
      </TemplateBox>
      <div className="flex flex-col w-full gap-4 text-sm text-primary-500">
        <div className="flex w-full px-4 place-content-between">
          <p>Tareas Incompletadas</p>
          <p>{stats.pendingTasks}</p>
        </div>
        <div className="flex w-full px-4 place-content-between">
          <p>Tareas Completadas</p>
          <p>{stats.completedTasks}</p>
        </div>
        <div className="flex w-full px-4 place-content-between">
          <p>Creadas</p>
          <p>{stats.totalTasks}</p>
        </div>
        <div className="flex w-full px-4 place-content-between">
          <p>Pendientes</p>
          <p>{stats.pendingTasks}</p>
        </div>
      </div>
    </div>
  );
}
