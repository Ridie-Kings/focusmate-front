import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import Menu from "@/components/Reusable/Menu";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { deleteTask } from "@/services/Task/deleteTask";
import { updateTask } from "@/services/Task/updateTask";
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
  const handleDeleteTask = async (id: string) => {
    const res = await deleteTask({ _id: id });

    if (res.success) {
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setEvents((prev) => prev.filter((task) => task._id !== id));
      console.log("Task deleted successfully");
    } else {
      console.log("Failed to delete task", res.message);
    }
  };

  const handleChangePriority = async (e: "high" | "medium" | "low") => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id
          ? {
              ...t,
              priority: e,
            }
          : t
      )
    );

    const res = await updateTask({
      _id: task._id,
      task: { priority: e },
    });

    if (res.success) console.log("Task change to task:", task.title);
    else console.log("Error changing task:", task.title);
  };

  const handleChangeStatus = async (e: StatusType) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id
          ? {
              ...t,
              status: e,
            }
          : t
      )
    );

    const res = await updateTask({
      _id: task._id,
      task: {
        status: e,
      },
    });

    if (res.success) console.log("Task change to:", task.title);
    else console.log("Error changing task:", task.title);
  };

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
                    onClick: () => handleChangePriority("high"),
                  },
                  {
                    label: "Media",
                    onClick: () => handleChangePriority("medium"),
                  },
                  {
                    label: "Baja",
                    onClick: () => handleChangePriority("low"),
                  },
                ],
              },
              {
                label: "Eliminar",
                color: "red",
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
              : ("completed" as StatusType)
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
