"use client";

import { useEffect, useState } from "react";
import { TaskType } from "@/interfaces/Task/TaskType";
import ListTask from "@/components/Pages/(Nav & Top)/Dashboard/Task/ListTask";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import StatusCards from "@/components/Pages/(Nav & Top)/Dashboard/Task/StatusCards";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useTranslations } from "next-intl";

export default function Task({ tasksList }: { tasksList: TaskType[] }) {
  const { tasks, setTasks, loadingTask } = useDashboardStore();
  const [filter, setFilter] = useState<string>("");
  const t = useTranslations("Dashboard.tasks");

  useEffect(() => {
    setTasks(tasksList);
  }, [tasksList, setTasks]);

  return (
    <TemplateDashboard
      grid={`col-span-4 row-span-4 row-start-6 gap-0`}
      title={t("title")}
      link="/task"
      id="tasks-component"
    >
      <StatusCards filter={filter} setFilter={setFilter} tasks={tasks} />
      <div className="flex flex-col gap-3">
        <p className="text-primary-500">
          {filter === ""
            ? t("pending")
            : filter !== "Completada"
            ? t("priority.title")
            : t("completed")}
        </p>
        <ListTask
          filter={filter}
          tasks={tasks}
          setTasks={setTasks}
          loadingTask={loadingTask}
        />
      </div>
    </TemplateDashboard>
  );
}
