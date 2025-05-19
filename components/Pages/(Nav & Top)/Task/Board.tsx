"use client";
import { useState } from "react";
import Column from "./Board/Status";
import { TaskType } from "@/interfaces/Task/TaskType";

export const Board = ({ tasks }: { tasks: TaskType[] }) => {
  const [cards, setCards] = useState<TaskType[]>(tasks);

  return (
    <div
      style={{ height: "calc(100vh - 125px)" }}
      className="flex w-full gap-3 overflow-y-auto p-6"
    >
      <Column
        title="Pendientes"
        status="pending"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="En progreso"
        status="progress"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="En revision"
        status="revision"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Completadas"
        status="completed"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Incompletadas"
        status="dropped"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};
