import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { TaskType } from "@/interfaces/Task/TaskType";
import { createTask } from "@/services/Task/createTask";
import { updateTask } from "@/services/Task/updateTask";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

export default function ModalTaskUtils({
  setError,
  task,
  setTasks,
  setIsLoading,
  setIsOpen,
}: {
  setError: (error: string | null) => void;
  task: tempTaskType;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  setIsLoading: (isLoading: boolean) => void;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
}) {
  const tDashboard = useTranslations("Dashboard.tasks");
  const tModal = useTranslations("Modal.error");

  const validateTask = () => {
    if (!task.title.trim()) {
      setError(tModal("title"));
      return false;
    }

    if (task.endDate && task.startDate && task.endDate <= task.startDate) {
      setError(tModal("endDate"));
      return false;
    }

    return true;
  };

  const handleUpdateTask = async () => {
    setError(null);
    if (!validateTask()) return;

    try {
      setIsLoading(true);
      const res = await updateTask({
        _id: task._id ?? "",
        task: {
          color: task.color,
          description: task.description,
          title: task.title,
          priority: task.priority,
          status: task.status,
        },
      });

      if (!res.success) {
        const errorMessage =
          typeof res.res === "string" ? res.res : tModal("update");
        setError(errorMessage);
        console.error("Failed to modify task", res.res);
        return;
      }

      setTasks((prev) =>
        prev.map((prevTask) => (prevTask._id === task._id ? res.res : prevTask))
      );
      setIsOpen({ text: "" });
    } catch (err) {
      console.error("Error inesperado:", err);
      setError(tModal("unexpected"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTask = async () => {
    setError(null);
    if (!validateTask()) return;

    try {
      setIsLoading(true);
      const res = await createTask({ task });

      if (res.success) {
        setTasks((prev) => [...prev, res.res]);
        setIsOpen({ text: "" });
      } else {
        setError(typeof res.res === "string" ? res.res : tModal("create"));
        console.error("Failed to create task", res.res);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setError(tModal("unexpected"));
    } finally {
      setIsLoading(false);
    }
  };

  const trad = () => {
    const priorityMap = {
      high: tDashboard("priority.high"),
      medium: tDashboard("priority.medium"),
      low: tDashboard("priority.low"),
    };

    return priorityMap[task.priority] || "";
  };

  return {
    handleSendTask,
    handleUpdateTask,
    trad,
  };
}
