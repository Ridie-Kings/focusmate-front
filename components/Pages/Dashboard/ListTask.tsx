import Button from "@/components/Reusable/Button";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { TaskType } from "@/interfaces/Task/TaskType";

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
        return tasks.filter((e) => e.status === "completed");
      case "En Progreso":
        return tasks.filter((e) => e.status === "progress");
      case "En Revisión":
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

  return (
    <>
      <div className="flex flex-col w-full gap-4 h-[265px] overflow-auto">
        {tasksRender.length > 0 ? (
          tasksRender.map((task) => (
            <li
              key={task._id}
              className="flex gap-4 py-3 px-3 bg-[#D9D9D9] rounded-lg"
            >
              <div className="flex w-full items-center justify-between">
                <p>{task.title}</p>
                <PriorityBadge priority={task.priority} />
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No hay task disponibles.</p>
        )}
      </div>
      <Button button="tertiary" type="button">
        Nueva Tarea
      </Button>
    </>
  );
}
