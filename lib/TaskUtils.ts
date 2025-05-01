import { useToast } from "@/components/Provider/ToastProvider";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { deleteTask } from "@/services/Task/deleteTask";
import { updateTask } from "@/services/Task/updateTask";
import { Dispatch, SetStateAction } from "react";

export default function TaskUtils({
  setTasks,
  setEvents,
}: {
  setTasks?: Dispatch<SetStateAction<TaskType[]>>;
  setEvents?: Dispatch<SetStateAction<TaskType[]>>;
}) {
  const { addToast } = useToast();

  const handleDeleteTask = async (id: string) => {
    const res = await deleteTask({ _id: id });

    if (res.success) {
      if (setTasks) setTasks((prev) => prev.filter((task) => task._id !== id));
      if (setEvents)
        setEvents((prev) => prev.filter((task) => task._id !== id));
      addToast({
        type: "success",
        message: "Task deleted successfully",
      });
    } else {
      addToast({
        type: "error",
        message: "Failed to delete task",
      });
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

    if (res.success)
      addToast({ type: "success", message: "Task updated successfully" });
    else addToast({ type: "error", message: "Failed to update task" });
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

    if (res.success)
      addToast({ type: "success", message: "Task updated successfully" });
    else addToast({ type: "error", message: "Failed to update task" });
  };

  return {
    handleDeleteTask,
    handleChangeStatus,
    handleChangePriority,
  };
}
