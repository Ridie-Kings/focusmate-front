import { tempTaskType, TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { TaskType } from "@/interfaces/Task/TaskType";
import { addTaskToCalendar } from "@/services/Calendar/addTaskToCalendar";
import { createTask } from "@/services/Task/createTask";
import { updateTask } from "@/services/Task/updateTask";
import { addHours } from "date-fns";
import { Dispatch, SetStateAction } from "react";

export default function ModalEventUtils({
  setError,
  task,
  setTasks,
  setEvents,
  setIsLoading,
  setIsOpen,
}: {
  setError: (error: string | null) => void;
  task: tempTaskType;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  setEvents: Dispatch<SetStateAction<TaskType[]>>;
  setIsLoading: (isLoading: boolean) => void;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
}) {
  const validateEvent = (): boolean => {
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
  const handleUpdateEvent = async () => {
    setError(null);

    if (!validateEvent()) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await updateTask({
        _id: task._id ?? "",
        task: {
          color: task.color,
          description: task.description,
          title: task.title,
          dueDate: task.dueDate,
          startDate: task.startDate,
          endDate: task.endDate,
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

      setEvents((prev) =>
        prev.map((event) => (event._id === task._id ? res.res : event))
      );

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

  const handleSendEvent = async () => {
    setError(null);

    if (!validateEvent()) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await createTask({
        task: {
          ...task,
          dueDate: addHours(
            task.dueDate ?? new Date(),
            -(task.dueDate?.getTimezoneOffset() ?? 0) / 60
          ),
        },
      });

      if (!res.success) {
        const errorMessage =
          typeof res.res === "string" ? res.res : "Error al crear la tarea";
        setError(errorMessage);
        console.error("Failed to create task", res.res);
        return;
      }

      setEvents((prev) => [...prev, res.res]);
      setTasks((prev) => [...prev, res.res]);

      try {
        const calendarResponse = await addTaskToCalendar({
          _id: res.res._id,
        });
        if (!calendarResponse.success) {
          console.error(
            "Error al añadir la tarea al calendario:",
            calendarResponse.res
          );
        }
      } catch (calendarError) {
        console.error(
          "Error al comunicarse con el servicio de calendario:",
          calendarError
        );
      }

      setIsOpen({ text: "" });
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleSendEvent,
    handleUpdateEvent,
  };
}
