import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { AlertCircle } from "lucide-react";

import { createTask } from "@/services/Task/createTask";
import { addTaskToCalendar } from "@/services/Calendar/addTaskToCalendar";
import BodyInputs from "./ModalEvent/BodyInputs";
import BtnSend from "./Modal/BtnSend";
import TopInputs from "./Modal/TopInputs";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import { updateTask } from "@/services/Task/updateTask";
import { addHours } from "date-fns";
import { TypeIsOpen } from "@/components/Provider/ModalProvider";

type ModalEventProps = {
  isOpen: TypeIsOpen;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
};

const DEFAULT_TASK: tempTaskType = {
  _id: undefined,
  title: "",
  description: "",
  status: "pending",
  startDate: new Date(),
  endDate: new Date(),
  dueDate: new Date(),
  priority: "high",
  color: "#d5ede2",
};

export default function ModalEvent({ setIsOpen, isOpen }: ModalEventProps) {
  const { setEvents, setTasks } = useContext(DashboardContext);

  const initialDate = useMemo(
    () => (isOpen.other instanceof Date ? isOpen.other : new Date()),
    [isOpen.other]
  );

  const [task, setTask] = useState<tempTaskType>({
    ...DEFAULT_TASK,
    startDate: initialDate,
    endDate: initialDate,
    dueDate: initialDate,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      isOpen.other &&
      isOpen.other instanceof Object &&
      "title" in isOpen.other
    ) {
      setTask(() => ({
        ...(isOpen.other as tempTaskType),
      }));
    }
  }, [isOpen.other]);

  const validateTask = (): boolean => {
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

    if (!validateTask()) {
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
          typeof res.message === "string"
            ? res.message
            : "Error al modificar la tarea";
        setError(errorMessage);
        console.error("Failed to modify task", res.message);
        return;
      }

      setEvents((prev) =>
        prev.map((event) => (event._id === task._id ? res.message : event))
      );

      setTasks((prev) =>
        prev.map((prevTask) =>
          prevTask._id === task._id ? res.message : prevTask
        )
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

    if (!validateTask()) {
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
          typeof res.message === "string"
            ? res.message
            : "Error al crear la tarea";
        setError(errorMessage);
        console.error("Failed to create task", res.message);
        return;
      }

      setEvents((prev) => [...prev, res.message]);
      setTasks((prev) => [...prev, res.message]);

      try {
        const calendarResponse = await addTaskToCalendar({
          _id: res.message._id,
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

  const isEditMode = Boolean(task._id);

  return (
    <div className="flex flex-col gap-2 w-full">
      <TopInputs
        error={error}
        setError={setError}
        task={task}
        setTask={setTask}
      />

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <BodyInputs
        date={initialDate}
        error={error}
        setError={setError}
        task={task}
        setTask={setTask}
      />

      <BtnSend
        text={isEditMode ? "Modificar" : undefined}
        loadingText={isEditMode ? "Modificando..." : undefined}
        handleClick={isEditMode ? handleUpdateTask : handleSendTask}
        isLoading={isLoading}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
