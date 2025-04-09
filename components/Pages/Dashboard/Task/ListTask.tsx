import Button from "@/components/Reusable/Button";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { TaskType } from "@/interfaces/Task/TaskType";
import { createTask } from "@/services/Task/createTask";
import { EllipsisVertical } from "lucide-react";
import { deleteTask } from "@/services/Task/deleteTask";
import MountainTask from "@/components/Elements/Svg/MountainTask";
import { useContext } from "react";
import { ModalContext } from "@/components/Provider/ModalProvider";
import { addTaskToCalendar } from "@/services/Calendar/addTaskToCalendar";

export default function ListTask({
  filter,
  tasks,
  setTasks,
}: {
  filter: string;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) {
  const { isOpen, setIsOpen } = useContext(ModalContext);

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

  const handleCreateTask = async () => {
    const task = {
      title: "TEST FINAL",
      description: "FINAL TEST",
      status: "pending",
      startDate: new Date("2025-04-10T00:00:00Z"),
      endDate: new Date("2025-04-10T05:00:00Z"),
      dueDate: new Date("2025-04-10T10:00:00Z"),
      tags: ["tag1", "tag2"],
    };

    const res = await createTask({ task });

    setTasks((prev) => [...prev, res.message]);

    if (res.success) {
      console.log("Task created successfully", res.message);
      const response = await addTaskToCalendar({ _id: res.message._id });

      if (res.success) {
        console.log("Tarea añadido al calendario:", response.res);
      } else {
        console.error("Error al añadidir la tarea al calendario");
      }
    } else {
      console.log("Failed to create task", res.message);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const res = await deleteTask({ _id: id });

    if (res.success) {
      setTasks((prev) => prev.filter((task) => task._id !== id));
      console.log("Task deleted successfully");
    } else {
      console.log("Failed to delete task", res.message);
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
                <div className="flex gap-1">
                  <PriorityBadge priority={task.priority} />
                  <EllipsisVertical
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
      <Button onClick={handleCreateTask} button="tertiary" type="button">
        Nueva Tarea
      </Button>
    </>
  );
}
