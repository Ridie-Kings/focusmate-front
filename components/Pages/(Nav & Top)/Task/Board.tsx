"use client";
import { useEffect } from "react";
import Column from "./Board/Status";
import { TaskType } from "@/interfaces/Task/TaskType";
import { useDashboardStore } from "@/stores/dashboardStore";

export const Board = ({ prevTasks }: { prevTasks: TaskType[] }) => {
  const { setTasks, tasks } = useDashboardStore();

  useEffect(() => {
    setTasks(prevTasks);
  }, [prevTasks]);

  return (
    <div
      style={{ height: "calc(100vh - 125px)" }}
      className="flex w-full gap-3 overflow-y-auto p-6"
    >
      <Column
        title="Pendientes"
        status="pending"
        cards={tasks}
        setCards={setTasks}
      />
      <Column
        title="En progreso"
        status="progress"
        cards={tasks}
        setCards={setTasks}
      />
      <Column
        title="En revision"
        status="revision"
        cards={tasks}
        setCards={setTasks}
      />
      <Column
        title="Completadas"
        status="completed"
        cards={tasks}
        setCards={setTasks}
      />
      <Column
        title="Incompletas"
        status="dropped"
        cards={tasks}
        setCards={setTasks}
      />
    </div>
  );
};
