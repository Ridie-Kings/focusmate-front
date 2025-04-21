import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import Menu from "@/components/Reusable/Menu";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import TaskUtils from "@/lib/TaskUtils";
import { deleteTask } from "@/services/Task/deleteTask";
import { updateTask } from "@/services/Task/updateTask";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function TaskCard({
  task,
  setTasks,
  setEvents,
}: {
  task: TaskType;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
}) {
  const { handleDeleteTask, handleChangeStatus, handleChangePriority } =
    TaskUtils({
      setTasks,
      setEvents,
    });

  return (
    <li className="flex items-center gap-2 group">
      <div className="h-full w-0 rounded-full bg-primary-500/25 group-hover:w-1 transition-all duration-200" />
      <div className="flex w-full p-4 items-center justify-between border-2 border-secondary-400 rounded-lg">
        <p className="text-primary-500">{task.title}</p>
        <div className="flex gap-2 items-center">
          <PriorityBadge priority={task.priority} status={task.status} />
          <Menu
            items={[
              {
                label: "Estado",
                subMenu: [
                  {
                    label: "Alta",
                    onClick: () => handleChangePriority("high", task._id),
                  },
                  {
                    label: "Media",
                    onClick: () => handleChangePriority("medium", task._id),
                  },
                  {
                    label: "Baja",
                    onClick: () => handleChangePriority("low", task._id),
                  },
                ],
              },
              {
                label: "Eliminar",
                color: "red",
                icon: <Trash2 />,
                onClick: () => handleDeleteTask(task._id),
              },
            ]}
          />
        </div>
      </div>
      <input
        type="checkbox"
        checked={task.status === "completed"}
        onChange={() =>
          handleChangeStatus(
            task.status === "completed"
              ? ("dropped" as StatusType)
              : ("completed" as StatusType),
            task._id
          )
        }
        className={`cursor-pointer size-6 border-2 rounded appearance-none ${
          task.status === "completed"
            ? "bg-primary-500 border-primary-500"
            : "bg-white border-gray-500"
        }`}
      />
    </li>
  );
}
