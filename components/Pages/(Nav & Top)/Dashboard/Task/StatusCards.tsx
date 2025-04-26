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
      label: "Completada",
      number: tasks.filter((t) => t.status === "completed").length,
    },
    {
      label: "Alta",
      number: tasks
        .filter((t) => t.priority === "high")
        .filter((t) => t.status !== "completed").length,
    },
    {
      label: "Media",
      number: tasks
        .filter((t) => t.priority === "medium")
        .filter((t) => t.status !== "completed").length,
    },
    {
      label: "Baja",
      number: tasks
        .filter((t) => t.priority === "low")
        .filter((t) => t.status !== "completed").length,
    },
  ];

  return (
    <ul className="flex w-full gap-3">
      {items.map((item) => (
        <li key={item.label} className="w-1/4">
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
