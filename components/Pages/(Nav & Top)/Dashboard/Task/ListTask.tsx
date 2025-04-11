import Button from "@/components/Reusable/Button";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { TaskType } from "@/interfaces/Task/TaskType";
import { ChevronDown, Trash2 } from "lucide-react";
import { deleteTask } from "@/services/Task/deleteTask";
import MountainTask from "@/components/Elements/Svg/MountainTask";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/components/Provider/ModalProvider";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import ModalPriorityPicker from "@/components/Elements/General/Modal/ModalPriorityPicker/ModalPriorityPicker";

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
    if (item) {
      setTasks((prev) => [...prev, item]);
      setEvents((prev) => [...prev, item]);
    }
  }, [item]);

  const handleDeleteTask = async (id: string) => {
    const res = await deleteTask({ _id: id });

    if (res.success) {
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setEvents((prev) => prev.filter((task) => task._id !== id));
      // console.log("Task deleted successfully");
    } else {
      // console.log("Failed to delete task", res.message);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4 h-[265px] overflow-auto">
        {tasksRender.length > 0 ? (
          tasksRender.map((task) => (
            <li key={task._id} className="flex gap-2 group">
              <div className="h-full w-0 rounded-full bg-primary-500/25 group-hover:w-1 transition-all duration-200" />
              <div className="flex w-full p-4 items-center justify-between bg-[#ecf3f0] rounded-lg">
                <p className="text-primary-500">{task.title}</p>
                <div className="flex gap-2 items-center">
                  <PriorityBadge priority={task.priority} />
                  <button
                    onClick={() =>
                      setOpenModal(openModal !== "" ? "" : task._id)
                    }
                    className="flex items-center text-primary-500 border border-primary-500 divide-x divide-primary-500 rounded-lg hover:bg-secondary-200 cursor-pointer relative"
                  >
                    <p className="px-4 py-2 ">Estado</p>
                    <ChevronDown
                      size={40}
                      className={`${
                        openModal === task._id ? "rotate-180" : ""
                      } px-2 transition-all duration-300`}
                    />
                    {openModal === task._id && (
                      <ModalPriorityPicker
                        onChange={(e) =>
                          setTasks((prev) =>
                            prev.map((t) =>
                              t._id === task._id
                                ? {
                                    ...t,
                                    priority: e.target.value as
                                      | "high"
                                      | "medium"
                                      | "low",
                                  }
                                : t
                            )
                          )
                        }
                      />
                    )}
                  </button>
                  <Trash2
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-primary-500 cursor-pointer"
                  />
                </div>
              </div>
            </li>
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
