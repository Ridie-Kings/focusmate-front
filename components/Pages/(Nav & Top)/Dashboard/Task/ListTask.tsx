import Button from "@/components/Reusable/Button";
import { TaskType } from "@/interfaces/Task/TaskType";
import MountainTask from "@/components/Elements/Svg/Mountain/MountainTask";
import { useContext, useState, useEffect } from "react";
import { ModalContext } from "@/components/Provider/ModalProvider";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import TaskCard from "./ListTask/TaskCard";

export default function ListTask({
  filter,
  tasks,
  setTasks,
}: {
  filter: string;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) {
  const [changingTaskIds, setChangingTaskIds] = useState<string[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const { setIsOpen } = useContext(ModalContext) as {
    setIsOpen: (params: { text: string; other?: unknown }) => void;
  };
  const { setEvents } = useContext(DashboardContext);

  useEffect(() => {
    const getFilteredTasks = () => {
      switch (filter) {
        case "Completada":
          return tasks.filter((e) => e.status === "completed");
        case "Alta":
          return tasks
            .filter((e) => e.priority === "high")
            .filter((t) => t.status !== "completed");
        case "Media":
          return tasks
            .filter((e) => e.priority === "medium")
            .filter((t) => t.status !== "completed");
        case "Baja":
          return tasks
            .filter((e) => e.priority === "low")
            .filter((t) => t.status !== "completed");
        case "":
          return tasks.filter((e) => e.status !== "completed");
        default:
          return tasks;
      }
    };

    setFilteredTasks(getFilteredTasks());

    if (isInitialRender) {
      setTimeout(() => {
        setIsInitialRender(false);
      }, 100);
    }
  }, [tasks, filter, isInitialRender]);

  const handleStatusChange = (taskId: string) => {
    setChangingTaskIds((prev) => [...prev, taskId]);

    setTimeout(() => {
      setChangingTaskIds((prev) => prev.filter((id) => id !== taskId));
    }, 800);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div
        className="flex flex-col w-full gap-4 h-[296px] overflow-y-auto overflow-x-visible transition-all duration-300"
        style={{
          opacity: isInitialRender ? 0 : 1,
        }}
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div
              key={task._id}
              className={`transform transition-all duration-300 flex items-center gap-2 ${
                isInitialRender ? "opacity-0 translate-y-6" : "opacity-100 "
              }`}
              style={{
                transitionDelay: `${isInitialRender ? index * 0.08 : 0}s`,
                transform: changingTaskIds.includes(task._id)
                  ? "translateY(5px)"
                  : "",
              }}
            >
              <TaskCard
                task={task}
                setIsChange={handleStatusChange}
                isChange={changingTaskIds.includes(task._id)}
                setEvents={setEvents}
                setTasks={setTasks}
              />
            </div>
          ))
        ) : (
          <div
            className={`flex flex-col items-center gap-3 justify-center h-full bg-quaternary-100 rounded-2xl py-4 transition-all duration-500 ${
              isInitialRender ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <MountainTask />
            <p className="text-primary-500 text-xl text-center mx-1 font-medium">
              El día está en blanco. ¡Agrega tus tareas
              {filter ? ` ${filter}` : ""}!
            </p>
          </div>
        )}
      </div>
      <div className="transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]">
        <Button
          size="large"
          onClick={() => setIsOpen({ text: "task" })}
          button="tertiary"
          type="button"
        >
          Nueva Tarea
        </Button>
      </div>
    </div>
  );
}
