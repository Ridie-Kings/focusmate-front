import Button from "@/components/Reusable/Button";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { TaskType } from "@/interfaces/Task/TaskType";
import { CreateTask } from "@/services/Task/CreateTask";

export default function ListTask({
  filter,
  tasks,
}: {
  filter: string;
  tasks: TaskType[];
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
    const res = await CreateTask();

    if (res.success) {
      console.log("Task created successfully");
    } else {
      console.log("Failed to create task");
    }
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4 h-[265px] overflow-auto">
        {tasksRender.length > 0 ? (
          tasksRender.map((task) => (
            <li
              key={task._id}
              className="flex p-4 border border-accent rounded-lg"
            >
              <div className="flex w-full items-center justify-between">
                <p className="text-primary-green">{task.title}</p>
                <PriorityBadge priority={task.priority} />
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
