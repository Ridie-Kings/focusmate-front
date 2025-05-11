import { DashboardContext } from "@/components/Provider/DashboardProvider";
import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { TaskType } from "@/interfaces/Task/TaskType";
import { X } from "lucide-react";
import { useContext, useState } from "react";

export default function AddTask() {
  const { tasks } = useContext(DashboardContext);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>();
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);

  const items = tasks.map((task) => ({
    label: task.title,
    onClick: () => setSelectedTask(task),
  }));

  return (
    <div
      style={{ width: isSelectedMenu ? 448 : 214 }}
      className="mx-auto flex place-content-between items-center justify-end relative border-2 p-1 border-secondary-100 rounded-lg transition-all duration-300"
    >
      <p className="text-sm text-gray-400 absolute left-1">
        {selectedTask ? selectedTask.title : "Ninguna tarea seleccionada"}
      </p>
      {selectedTask ? (
        <button
          onClick={() => setSelectedTask(null)}
          className="bg-secondary-100 rounded cursor-pointer"
        >
          <X />
        </button>
      ) : (
        <ButtonDropDown
          items={items}
          onClick={() => setIsSelectedMenu(true)}
          className="bg-secondary-100 py-1 rounded text-sm text-primary-500"
        >
          Añade aqui tu tarea
        </ButtonDropDown>
      )}
    </div>
  );
}
