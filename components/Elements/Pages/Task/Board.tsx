"use client";
import { useState } from "react";
import { Status } from "./Status";
import { TaskType } from "@/interfaces/Task/TaskType";

export const Board = ({ tasks }: { tasks: TaskType[] }) => {
  const [cards, setCards] = useState(tasks);

  return (
    <>
      <div className="flex h-full w-full gap-3 overflow-auto 2xl:p-12 p-5">
        <Status
          title="Pendientes"
          status="pending"
          cards={cards}
          setCards={setCards}
        />
        <Status
          title="En Progreso"
          status="progress"
          cards={cards}
          setCards={setCards}
        />
        <Status
          title="En Revisíon"
          status="revision"
          cards={cards}
          setCards={setCards}
        />
        <Status
          title="Completados"
          status="completed"
          cards={cards}
          setCards={setCards}
        />
        <Status
          title="No Completados"
          status="dropped"
          cards={cards}
          setCards={setCards}
        />
      </div>
      {cards.length <= 0 && (
        <p className="text-black flex-1 w-full flex items-center justify-center text-4xl">
          No tienes tareas
        </p>
      )}
    </>
  );
};
