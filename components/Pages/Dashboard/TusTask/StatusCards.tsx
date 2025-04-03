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
      label: "Pendientes",
      number: tasks.filter((t) => t.status === "pending").length,
    },
    {
      label: "En Progreso",
      number: tasks.filter((t) => t.status === "progress").length,
    },
    {
      label: "En Revision",
      number: tasks.filter((t) => t.status === "revision").length,
    },
    {
      label: "Completados",
      number: tasks.filter((t) => t.status === "completed").length,
    },
    {
      label: "No Completados",
      number: tasks.filter((t) => t.status === "dropped").length,
    },
  ];

  return (
    <ul className="flex w-full gap-3">
      {items.map((item, index) => (
        <li key={item.label} className="w-1/5">
          <div
            style={{
              backgroundColor:
                filter === item.label
                  ? "#202020"
                  : index === 0
                  ? "#014e44"
                  : index === 1
                  ? "#248277"
                  : index === 2
                  ? "#56ab91"
                  : index === 3
                  ? "#78c6a3"
                  : index === 4
                  ? "#d5ede2"
                  : "",
              color:
                filter === item.label
                  ? "#fff9f9"
                  : index === 0
                  ? "white"
                  : index === 1
                  ? "white"
                  : index === 2
                  ? "white"
                  : index === 3
                  ? "black"
                  : index === 4
                  ? "black"
                  : "",
            }}
            className="flex flex-col border w-full h-full px-2 py-3 text-sm rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
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
