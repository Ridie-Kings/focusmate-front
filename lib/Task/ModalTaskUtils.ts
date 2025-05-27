import { TypeIsOpen } from "@/components/Provider/ModalProvider";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { TaskType } from "@/interfaces/Task/TaskType";
import { createTask } from "@/services/Task/createTask";
import { updateTask } from "@/services/Task/updateTask";
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
  const validateTask = () => {
    if (!task.title.trim()) {
      setError("El título es obligatorio");
      return false;
    }

    if (task.endDate && task.startDate && task.endDate <= task.startDate) {
      setError(
        "La hora de finalización debe ser posterior a la hora de inicio"
      );
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
          typeof res.res === "string" ? res.res : "Error al modificar la tarea";
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
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
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
        setError(
          typeof res.res === "string" ? res.res : "Error al crear la tarea"
        );
        console.error("Failed to create task", res.res);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const trad = () => {
    const priorityMap = {
      high: "Alta",
      medium: "Media",
      low: "Baja",
    };

    return priorityMap[task.priority as keyof typeof priorityMap] || "";
  };

  return {
    handleSendTask,
    handleUpdateTask,
    trad,
  };
}
