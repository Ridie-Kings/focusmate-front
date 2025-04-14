"use client";

import { useContext, useEffect, useState } from "react";

import { TaskType } from "@/interfaces/Task/TaskType";

import ListTask from "@/components/Pages/(Nav & Top)/Dashboard/Task/ListTask";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import StatusCards from "@/components/Pages/(Nav & Top)/Dashboard/Task/StatusCards";
import { DashboardContext } from "@/components/Provider/DashboardProvider";

export default function Task({ tasksList }: { tasksList: TaskType[] }) {
  const { tasks, setTasks } = useContext(DashboardContext);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    setTasks(tasksList);
  }, [tasksList]);


  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-6 gap-0"
      title="Tus Tareas"
      link="/task"
    >
      <StatusCards filter={filter} setFilter={setFilter} tasks={tasks} />
      <p className="text-primary-500">
        {filter === "" ? "Todas las Tareas" : filter}
      </p>
      <ListTask filter={filter} tasks={tasks} setTasks={setTasks} />
    </TemplateDashboard>
  );
}
