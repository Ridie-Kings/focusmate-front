import { useToast } from "@/components/Provider/ToastProvider";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { TaskType } from "@/interfaces/Task/TaskType";
import { addTaskToCalendar } from "@/services/Calendar/addTaskToCalendar";
import { createTask } from "@/services/Task/createTask";
import { updateTask } from "@/services/Task/updateTask";
import { addHours } from "date-fns";
import { Dispatch, SetStateAction } from "react";

type EventUtilsProps = {
  task: tempTaskType;
  setTasks?: Dispatch<SetStateAction<TaskType[]>>;
  setEvents?: Dispatch<SetStateAction<TaskType[]>>;
  setIsOpen: Dispatch<SetStateAction<{ text: string; other?: unknown }>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function useEventUtils({
  task,
  setTasks,
  setEvents,
  setIsOpen,
  setError,
  setIsLoading,
}: EventUtilsProps) {
  const { addToast } = useToast();

  const validateTask = (): boolean => {
    if (!task.title?.trim()) {
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

  const updateLocalState = (newTask: TaskType) => {
    if (setEvents) {
      setEvents((prev) =>
        prev.map((event) => (event._id === task._id ? newTask : event))
      );
    }

    if (setTasks) {
      setTasks((prev) =>
        prev.map((prevTask) => (prevTask._id === task._id ? newTask : prevTask))
      );
    }
  };

  const addToLocalState = (newTask: TaskType) => {
    if (setEvents) setEvents((prev) => [...prev, newTask]);
    if (setTasks) setTasks((prev) => [...prev, newTask]);
  };

  const showSuccessAndClose = (message: string) => {
    addToast({
      type: "success",
      message,
      duration: 3000,
    });
    setIsOpen({ text: "" });
  };

  const handleApiError = (
    res: { success: boolean; message: unknown },
    defaultMessage: string
  ): boolean => {
    if (!res.success) {
      const errorMessage =
        typeof res.message === "string" ? res.message : defaultMessage;
      setError(errorMessage);
      console.error(defaultMessage, res.message);
      return true;
    }
    return false;
  };

  const handleUpdateTask = async () => {
    setError(null);

    if (!validateTask()) {
      return;
    }

    try {
      setIsLoading(true);

      if (!task._id) {
        setError("ID de tarea no válido");
        return;
      }

      const res = await updateTask({
        _id: task._id,
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

      if (handleApiError(res, "Error al modificar la tarea")) {
        return;
      }

      updateLocalState(res.message);
      showSuccessAndClose("Tarea actualizada correctamente");
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTask = async () => {
    setError(null);

    if (!validateTask()) {
      return;
    }

    try {
      setIsLoading(true);

      const adjustedTask = {
        ...task,
        dueDate: task.dueDate
          ? addHours(task.dueDate, -(task.dueDate.getTimezoneOffset() / 60))
          : undefined,
      };

      const res = await createTask({ task: adjustedTask });

      if (handleApiError(res, "Error al crear la tarea")) {
        return;
      }

      const newTask = res.message;
      addToLocalState(newTask);
      showSuccessAndClose("Tarea creada correctamente");

      try {
        const calendarResponse = await addTaskToCalendar({
          _id: newTask._id,
        });

        if (!calendarResponse.success) {
          console.warn(
            "No se pudo añadir la tarea al calendario:",
            calendarResponse.res
          );
        }
      } catch (calendarError) {
        console.warn(
          "Error al comunicarse con el servicio de calendario:",
          calendarError
        );
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSendTask,
    handleUpdateTask,
  };
}
