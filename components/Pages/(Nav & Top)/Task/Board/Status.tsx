import { Dispatch, SetStateAction, useState } from "react";
import AddCard from "./Status/AddCard";
import Card from "./Status/Card";
import DropIndicator from "./Status/DropIndicator";
import KanbanUtils from "@/lib/Task/KanbanUtils";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";

type ColumnProps = {
  title: string;
  cards: TaskType[];
  status: StatusType;
  setCards: Dispatch<SetStateAction<TaskType[]>>;
};

const Column = ({ title, cards, status, setCards }: ColumnProps) => {
  const [active, setActive] = useState(false);

  const { handleDragEnd, handleDragLeave, handleDragOver, handleDragStart } =
    KanbanUtils({
      setActive,
      cards,
      setCards,
      status,
    });

  const filteredCards = cards.filter((c) => c.status === status);

  return (
    <div
      className={`flex-1 shrink-0 ${
        filteredCards.length >= 5 ? "overflow-y-auto" : ""
      }`}
    >
      <div className="flex flex-col py-4 px-2 text-sm border-2 border-secondary-200 text-primary-500 rounded-2xl sticky top-0 bg-white z-10">
        <h3>{title}</h3>
        <span>{filteredCards.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full flex flex-col items-center transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card key={c._id} task={c} handleDragStart={handleDragStart} />
          );
        })}
        <DropIndicator beforeId={null} column={status} />
        <AddCard column={status} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;
