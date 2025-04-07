import Button from "@/components/Reusable/Button";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { TaskType } from "@/interfaces/Task/TaskType";
import { CreateTask } from "@/services/Task/CreateTask";
import { EllipsisVertical } from "lucide-react";
import { DeleteTask } from "@/services/Task/DeleteTask";

export default function ListTask({
  filter,
  tasks,
  setTasks,
}: {
  filter: string;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) {
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
      title: "Task",
      description: "Description",
      status: "completed",
      startDate: new Date("2025-02-24T00:00:00Z"),
      endDate: new Date("2025-02-24T00:00:00Z"),
      dueDate: new Date("2025-02-24T00:00:00Z"),
      tags: ["tag1", "tag2"],
    };

    const res = await CreateTask({ task });

    setTasks((prev) => [...prev, res.message]);

    if (res.success) {
      console.log("Task created successfully");
    } else {
      console.log("Failed to create task");
    }
  };

  const handleDeleteTask = async (id: string) => {
    const res = await DeleteTask({ _id: id });

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
              <div className="h-full w-0 rounded-full bg-primary-green/25 group-hover:w-1 transition-all duration-200" />
              <div className="flex w-full p-4 items-center justify-between bg-[#ecf3f0] rounded-lg">
                <p className="text-primary-green">{task.title}</p>
                <div className="flex gap-1">
                  <PriorityBadge priority={task.priority} />
                  <EllipsisVertical
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-primary-green cursor-pointer"
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            {filter !== ""
              ? `No tienes task ${filter} .`
              : "No tienes ningun task"}
          </p>
        )}
      </div>
      <Button onClick={handleCreateTask} button="tertiary" type="button">
        Nueva Tarea
      </Button>
    </>
  );
}
