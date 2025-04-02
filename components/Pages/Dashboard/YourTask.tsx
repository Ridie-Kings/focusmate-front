"use client";
import { useState } from "react";
import ListTask from "@/components/Pages/Dashboard/ListTask";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import StatusCards from "@/components/Pages/Dashboard/TusTask/StatusCards";
import { TaskType } from "@/interfaces/Task/TaskType";

export default function Task({ tasks }: { tasks: TaskType[] }) {
  const [filter, setFilter] = useState<string>("");

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-6 gap-0"
      title="Tus Task"
      link="/task"
    >
      <StatusCards filter={filter} setFilter={setFilter} tasks={tasks} />
      <ListTask filter={filter} tasks={tasks} />
    </TemplateDashboard>
  );
}
