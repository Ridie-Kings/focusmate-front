import Button from "@/components/Reusable/Button";
import { TaskType } from "@/interfaces/Task/TaskType";
import MountainTask from "@/components/Elements/Svg/Mountain/MountainTask";
import { useContext, useEffect, useState } from "react";
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
  const { setIsOpen, item } = useContext(ModalContext);
  const { setEvents } = useContext(DashboardContext);
  const [openModal, setOpenModal] = useState<string>("");

  const render = () => {
    switch (filter) {
      case "Pendientes":
        return tasks.filter((e) => e.status === "pending");
      case "En Progreso":
        return tasks.filter((e) => e.status === "progress");
      case "En Revision":
        return tasks.filter((e) => e.status === "revision");
      case "No Completados":
        return tasks.filter((e) => e.status === "dropped");
      case "Completados":
        return tasks.filter((e) => e.status === "completed");
      case "":
        return tasks;
      default:
        return tasks;
    }
  };
  const tasksRender = render();

  useEffect(() => {
    if (item && item.type === "task") {
      console.log(item);

      setTasks((prev) => [...prev, item.item]);
      setEvents((prev) => [...prev, item.item]);
    }
  }, [item]);

  return (
    <>
      <div className="flex flex-col w-full gap-4 h-[265px] overflow-auto">
        {tasksRender.length > 0 ? (
          tasksRender.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              setEvents={setEvents}
              setTasks={setTasks}
              setOpenModal={setOpenModal}
              openModal={openModal}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[265px] bg-quaternary-100 rounded-2xl py-4">
            <MountainTask />
            <p className="text-primary-500 text-xl">
              El día está en blanco. ¡Agregá tus tareas {filter}!
            </p>
          </div>
        )}
      </div>
      <Button
        size="large"
        onClick={() => setIsOpen("task")}
        button="tertiary"
        type="button"
      >
        Nueva Tarea
      </Button>
    </>
  );
}
