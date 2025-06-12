"use client";
import { useEffect } from "react";
import Column from "./Board/Status";
import { TaskType } from "@/interfaces/Task/TaskType";
import { useDashboardStore, useTasks } from "@/stores/dashboardStore";

export const Board = ({ prevTasks }: { prevTasks: TaskType[] }) => {
  const { setTasks } = useDashboardStore((state) => state.actions);
  const tasks = useTasks();

  useEffect(() => {
    setTasks(prevTasks);
  }, [prevTasks]);

  return (
    <div className="flex h-screen w-full gap-3 overflow-hidden p-6">
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
