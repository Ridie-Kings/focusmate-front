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
  const { setIsOpen, item } = useContext(ModalContext) as {
    setIsOpen: (value: string) => void;
    item: { type: string; item: TaskType } | null;
  };
  const { setEvents } = useContext(DashboardContext);
  const [openModal, setOpenModal] = useState<string>("");

  const render = () => {
    switch (filter) {
      case "Alta":
        return tasks.filter((e) => e.priority === "high");
      case "Medio":
        return tasks.filter((e) => e.priority === "medium");
      case "Bajo":
        return tasks.filter((e) => e.priority === "low");
      case "":
        return tasks;
      default:
        return tasks;
    }
  };
  const tasksRender = render();

  useEffect(() => {
    if (item && item.type === "task") {
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
