import ModalPriorityPicker from "@/components/Elements/General/Modal/ModalPriorityPicker/ModalPriorityPicker";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { TaskType } from "@/interfaces/Task/TaskType";
import { deleteTask } from "@/services/Task/deleteTask";
import { updateTask } from "@/services/Task/updateTask";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function TaskCard({
  task,
  setTasks,
  setEvents,
  openModal,
  setOpenModal,
}: {
  task: TaskType;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  openModal: string;
  setOpenModal: Dispatch<SetStateAction<string>>;
}) {
  const handleDeleteTask = async (id: string) => {
    const res = await deleteTask({ _id: id });

    if (res.success) {
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setEvents((prev) => prev.filter((task) => task._id !== id));
      console.log("Task deleted successfully");
    } else {
      console.log("Failed to delete task", res.message);
    }
  };

  const handleChangePriority = async (e: string) => {
    const res = await updateTask({
      _id: task._id,
      task: { priority: e },
    });
    if (res.success) console.log("Task change to task:", task.title);
    else console.log("Error changing task:", task.title);
  };

  return (
    <li className="flex gap-2 group">
      <div className="h-full w-0 rounded-full bg-primary-500/25 group-hover:w-1 transition-all duration-200" />
      <div className="flex w-full p-4 items-center justify-between border-2 border-secondary-400 rounded-lg">
        <p className="text-primary-500">{task.title}</p>
        <div className="flex gap-2 items-center">
          <PriorityBadge priority={task.priority} />
          <button
            onClick={() => setOpenModal(openModal !== "" ? "" : task._id)}
            className="flex items-center text-primary-500 border border-primary-500 divide-x divide-primary-500 rounded-lg hover:bg-secondary-200 cursor-pointer relative"
          >
            <p className="px-4 py-2">Estado</p>
            <ChevronDown
              size={40}
              className={`${
                openModal === task._id ? "rotate-180" : ""
              } px-2 transition-all duration-300`}
            />
            {openModal === task._id && (
              <ModalPriorityPicker
                onChange={(e) => {
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
                  );
                  handleChangePriority(e.target.value);
                }}
              />
            )}
          </button>
          <EllipsisVertical
            onClick={() => handleDeleteTask(task._id)}
            className="text-primary-500 cursor-pointer"
          />
        </div>
      </div>
    </li>
  );
}
