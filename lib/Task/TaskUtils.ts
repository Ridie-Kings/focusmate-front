import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { deleteTask } from "@/services/Task/deleteTask";
import { updateTask } from "@/services/Task/updateTask";
import { Dispatch, SetStateAction } from "react";

export default function TaskUtils({
  setTasks,
  setEvents,
}: {
  setTasks?: Dispatch<SetStateAction<TaskType[]>>;
  setEvents?: Dispatch<SetStateAction<TaskType[] >>;
}) {
  const handleDeleteTask = async (id: string) => {
    const res = await deleteTask({ _id: id });

    if (res.success) {
      if (setTasks) setTasks((prev) => prev.filter((task) => task._id !== id));
      if (setEvents)
        setEvents((prev) => prev.filter((task) => task._id !== id));
      console.log("Task deleted successfully");
    } else {
      console.log("Failed to delete task", res.res);
    }
  };

  const handleChangeStatus = async (e: StatusType, _id: string) => {
    if (setTasks)
      setTasks((prev) =>
        prev.map((t) =>
          t._id === _id
            ? {
                ...t,
                status: e,
              }
            : t
        )
      );
    if (setEvents)
      setEvents((prev) =>
        prev.map((t) =>
          t._id === _id
            ? {
                ...t,
                status: e,
              }
            : t
        )
      );

    const res = await updateTask({
      _id,
      task: {
        status: e,
      },
    });

    if (res.success) console.log("Task change to:", _id);
    else console.log("Error changing task:", _id);
  };

  const handleChangePriority = async (
    e: "high" | "medium" | "low",
    _id: string
  ) => {
    if (setTasks)
      setTasks((prev) =>
        prev.map((t) =>
          t._id === _id
            ? {
                ...t,
                priority: e,
              }
            : t
        )
      );

    if (setEvents)
      setEvents((prev) =>
        prev.map((t) =>
          t._id === _id
            ? {
                ...t,
                priority: e,
              }
            : t
        )
      );

    const res = await updateTask({
      _id,
      task: { priority: e },
    });

    if (res.success) console.log("Task change to task:", _id);
    else console.log("Error changing task:", _id);
  };

  return {
    handleDeleteTask,
    handleChangeStatus,
    handleChangePriority,
  };
}
