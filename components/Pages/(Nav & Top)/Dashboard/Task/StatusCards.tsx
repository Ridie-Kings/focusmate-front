import { TaskType } from "@/interfaces/Task/TaskType";
import { Dispatch, SetStateAction } from "react";

export default function StatusCards({
  setFilter,
  filter,
  tasks,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
  tasks: TaskType[];
}) {
  const items = [
    {
      label: "Alto",
      number: tasks.filter((t) => t.priority === "high").length,
    },
    {
      label: "Medio",
      number: tasks.filter((t) => t.priority === "medium").length,
    },
    {
      label: "Bajo",
      number: tasks.filter((t) => t.priority === "low").length,
    },
  ];

  return (
    <ul className="flex w-full gap-3">
      {items.map((item) => (
        <li key={item.label} className="w-1/3">
          <div
            style={{
              backgroundColor: filter === item.label ? "#248277" : "#D5EDE2",
              color: filter === item.label ? "white" : "black",
            }}
            className="flex flex-col border flex-1 w-full h-full px-2 py-3 text-sm rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setFilter(filter === item.label ? "" : item.label)}
          >
            <span className="truncate">{item.label}</span>
            <span>{item.number}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
