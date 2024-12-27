import { Clock, Plus } from "lucide-react";
import Divider from "../General/Divider";
import PriorityBadge from "../General/PriorityBadge";

type tareasType = {
  id: number;
  title: string;
  description: string;
  status: "pendiente" | "en progreso" | "completado";
  priority: "alta" | "media" | "baja";
  dueDate: string;
};

export default function TareasElement({
  items,
  title,
}: {
  items: tareasType[];
  title: string;
}) {
  return (
    <li className="flex-1 flex flex-col gap-3">
      <p className="border-2 rounded-lg px-2">
        {title}
        <br />
        {items.length}
      </p>
      <div className="flex flex-col gap-2">
        <ul className="flex flex-col gap-3 text-gray-100">
          {items.map((items) => (
            <li
              key={items.id}
              className="p-2 border rounded-lg flex flex-col gap-3"
            >
              <div className="flex place-content-between">
                <div className="flex gap-2">
                  <Clock /> {items.dueDate}
                </div>
                <PriorityBadge priority={items.priority} />
              </div>
              <Divider />
              <p className="text-lg">{items.description}</p>
            </li>
          ))}
        </ul>
        <button className="border rounded-lg flex w-full items-center justify-center py-2 text-gray-100 gap-2">
          <Plus /> Nueva Tarea
        </button>
      </div>
    </li>
  );
}
