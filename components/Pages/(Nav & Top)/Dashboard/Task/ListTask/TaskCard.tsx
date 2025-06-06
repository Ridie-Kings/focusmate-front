import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { useModalStore } from "@/stores/modalStore";
import Menu from "@/components/Reusable/Menu";
import { TaskType } from "@/interfaces/Task/TaskType";
import { Pen, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";

export default function TaskCard({
  task,
  setIsChange,
  isChange,
}: {
  setIsChange: (taskId: string) => void;
  isChange: boolean;
  task: TaskType;
}) {
  const { setIsOpen } = useModalStore((state) => state.actions);
  const { removeTask, updateTask } = useDashboardStore(
    (state) => state.actions
  );
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChange && cardRef.current) {
      const keyframes = [
        { transform: "scale(1)" },
        { transform: "scale(0.97)", offset: 0.1 },
        { transform: "scale(0.97)", offset: 0.5 },
        {
          transform: `scale(0.97) translateX(${
            task.status === "completed" ? "" : "-"
          }30px)`,
          offset: 0.9,
        },
        {
          transform: `scale(1) translateX(${
            task.status === "completed" ? "" : "-"
          }40px)`,
          opacity: 0,
          offset: 1,
        },
      ];

      const options = {
        duration: 1000,
        easing: "ease-in-out",
        fill: "forwards" as FillMode,
      };

      cardRef.current.animate(keyframes, options);
    }
  }, [isChange]);

  const handleStatus = () => {
    setIsChange(task._id);
    setTimeout(() => {
      updateTask(
        task._id,
        task.status === "completed"
          ? { status: "pending" }
          : { status: "completed" }
      );
    }, 1000);
  };

  const handleDelete = () => {
    setIsChange(task._id);
    setTimeout(() => {
      removeTask(task._id);
    }, 1000);
  };

  return (
    <div
      ref={cardRef}
      className="transform transition-all duration-300 flex items-center gap-2"
    >
      <div className="h-full w-0 rounded-full bg-primary-500/25 group-hover:w-1 transition-all duration-1000" />{" "}
      <div className="flex w-full p-4 bg-white items-center justify-between border-2 border-secondary-400 rounded-lg group">
        {" "}
        <div className="flex items-center gap-3 text-primary-500">
          <p>{task.title}</p>{" "}
          <p className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-900 delay-100 cursor-default truncate flex-1 sm:block hidden">
            {" "}
            {task.description}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <PriorityBadge priority={task.priority} status={task.status} />
          <Menu
            items={[
              {
                label: "Estado",
                subMenu: [
                  {
                    label: "Alta",
                    onClick: () => updateTask(task._id, { priority: "high" }),
                  },
                  {
                    label: "Media",
                    onClick: () => updateTask(task._id, { priority: "medium" }),
                  },
                  {
                    label: "Baja",
                    onClick: () => updateTask(task._id, { priority: "low" }),
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
        className={`cursor-pointer size-6 border-2 rounded appearance-none ${
          task.status === "completed"
            ? "bg-primary-500 border-primary-500"
            : "bg-white border-gray-500"
        }`}
      />{" "}
    </div>
  );
}
