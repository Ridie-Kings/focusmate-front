"use client";
import { useEffect, useState } from "react";
import ListTask from "@/components/Pages/Dashboard/ListTask";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import StatusCards from "@/components/Pages/Dashboard/TusTask/StatusCards";
import { TaskType } from "@/interfaces/Task/TaskType";

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
      <StatusCards filter={filter} setFilter={setFilter} tasks={tasks} />
      <p className="text-primary-green">
        {filter === "" ? "All Task" : filter}
      </p>
      <ListTask filter={filter} tasks={tasksList} setTasks={setTasksList} />
    </TemplateDashboard>
  );
}
