import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { ModalContext } from "@/components/Provider/ModalProvider";
import Menu from "@/components/Reusable/Menu";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import TaskUtils from "@/lib/TaskUtils";
import { Pen, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useContext } from "react";

export default function TaskCard({
  task,
  setTasks,
  setEvents,
  setIsChange,
  isChange,
}: {
  setIsChange: (taskId: string) => void;
  isChange: boolean;
  task: TaskType;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
}) {
  const { setIsOpen } = useContext(ModalContext);
  const { handleDeleteTask, handleChangeStatus, handleChangePriority } =
    TaskUtils({
      setTasks,
      setEvents,
    });

  const handleStatus = () => {
    setIsChange(task._id);
    setTimeout(() => {
      handleChangeStatus(
        task.status === "completed"
          ? ("dropped" as StatusType)
          : ("completed" as StatusType),
        task._id
      );
      setIsChange("");
    }, 1000);
  };
  const handleDelete = () => {
    setIsChange(task._id);
    setTimeout(() => {
      handleDeleteTask(task._id);
      setIsChange("");
    }, 1000);
  };

  return (
    <>
      <div
        style={{
          transform: isChange ? "translateX(-100%)" : "translateX(0%)",
        }}
        className="h-full w-0 rounded-full bg-primary-500/25 group-hover:w-1 transition-all duration-1000"
      />{" "}
      <div
        style={{
          transform: isChange ? "translateY(-100%)" : "translateY()",
        }}
        className="flex w-full p-4 bg-white items-center justify-between border-2 border-secondary-400 rounded-lg group transition-all duration-800 delay-200"
      >
        {" "}
        <div className="flex items-center gap-3 text-primary-500">
          <p
            style={{
              transform: isChange ? "translateY(-100%)" : "translateY(0%)",
            }}
            className="transition-all duration-1000"
          >
            {task.title}
          </p>{" "}
          <p
            style={{
              transform: isChange ? "translateY(-100%)" : "translateY(0%)",
            }}
            className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-900 delay-100 cursor-default truncate flex-1"
          >
            {" "}
            {task.description}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <PriorityBadge
            priority={task.priority}
            status={task.status}
            style={{
              transform: isChange ? "translateY(-100%)" : "translateY(0%)",
            }}
            className="transition-all duration-850 delay-150"
          />
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
                label: "Modificar",
                icon: <Pen size={20} />,
                onClick: () => setIsOpen({ text: "task", other: task }),
              },
              {
                label: "Eliminar",
                color: "red",
                icon: <Trash2 />,
                onClick: () => handleDelete(),
              },
            ]}
          />
        </div>
      </div>
      <input
        type="checkbox"
        checked={task.status === "completed"}
        onChange={handleStatus}
        style={{
          transform: isChange ? "translateY(-200%)" : "translateY(0%)",
        }}
        className={`cursor-pointer size-6 border-2 rounded appearance-none transition-all duration-750 delay-250 ${
          task.status === "completed"
            ? "bg-primary-500 border-primary-500"
            : "bg-white border-gray-500"
        }`}
      />{" "}
    </>
  );
}
