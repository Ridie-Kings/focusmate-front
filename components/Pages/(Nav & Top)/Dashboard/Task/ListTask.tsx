import Button from "@/components/Reusable/Button";
import { TaskType } from "@/interfaces/Task/TaskType";
import MountainTask from "@/components/Elements/Svg/Mountain/MountainTask";
import { useContext } from "react";
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
  const { setIsOpen } = useContext(ModalContext) as {
    setIsOpen: (params: { text: string; other?: unknown }) => void;
  };
  const { setEvents } = useContext(DashboardContext);

  const render = () => {
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
  const tasksRender = render();

  return (
    <>
      <div className="flex flex-col w-full gap-4 h-[296px] overflow-y-auto overflow-x-visible">
        {tasksRender.length > 0 ? (
          tasksRender.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              setEvents={setEvents}
              setTasks={setTasks}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[265px] bg-quaternary-100 rounded-2xl py-4">
            <MountainTask />
            <p className="text-primary-500 text-xl text-center mx-1">
              El día está en blanco. ¡Agrega tus tareas{filter}!
            </p>
          </div>
        )}
      </div>
      <Button
        size="large"
        onClick={() => setIsOpen({ text: "task" })}
        button="tertiary"
        type="button"
      >
        Nueva Tarea
      </Button>
    </>
  );
}
