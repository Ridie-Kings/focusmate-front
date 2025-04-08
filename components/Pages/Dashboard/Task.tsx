"use client";

import { useEffect, useState } from "react";

import { TaskType } from "@/interfaces/Task/TaskType";

import ListTask from "@/components/Pages/Dashboard/Task/ListTask";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import StatusCards from "@/components/Pages/Dashboard/Task/StatusCards";

export default function Task({ tasks }: { tasks: TaskType[] }) {
  const [filter, setFilter] = useState<string>("");
  const [tasksList, setTasksList] = useState<TaskType[]>([]);

  useEffect(() => {
    setTasksList(tasks);
  }, [tasks]);

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-6 gap-0"
      title="Tus Task"
      link="/task"
    >
      <StatusCards filter={filter} setFilter={setFilter} tasks={tasksList} />
      <p className="text-primary-500">{filter === "" ? "All Task" : filter}</p>
      <ListTask filter={filter} tasks={tasksList} setTasks={setTasksList} />
    </TemplateDashboard>
  );
}
