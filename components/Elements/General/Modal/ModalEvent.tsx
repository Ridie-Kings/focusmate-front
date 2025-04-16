import { Dispatch, SetStateAction, useState } from "react";
import { AlertCircle } from "lucide-react";

import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { createTask } from "@/services/Task/createTask";
import { addTaskToCalendar } from "@/services/Calendar/addTaskToCalendar";
import BodyInputs from "./ModalEvent/BodyInputs";
import BtnSend from "./Modal/BtnSend";
import TopInputs from "./Modal/TopInputs";

export type tempTaskType = {
  title: string;
  description: string;
  status: StatusType;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
  priority: "high" | "medium" | "low";
  tags: string[];
  color: string;
};

export default function ModalEvent({
  setIsOpen,
  setItem,
}: {
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: (data: { type: string; item: TaskType }) => void;
}) {
  const [task, setTask] = useState<tempTaskType>({
    title: "",
    description: "",
    status: "pending",
    startDate: new Date(),
    endDate: new Date(),
    dueDate: new Date(),
    priority: "high",
    tags: [],
    color: "#d5ede2",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateTask = () => {
    if (!task.title.trim()) {
      setError("El título es obligatorio");
      return false;
    }
    console.log(task.endDate, task.startDate);

    if (task.endDate <= task.startDate) {
      setError(
        "La hora de finalización debe ser posterior a la hora de inicio"
      );
      return false;
    }

    return true;
  };

  const handleSendTask = async () => {
    try {
      setError(null);

      if (!validateTask()) {
        return;
      }

      setIsLoading(true);
      const res = await createTask({ task });

      if (res.success) {
        setItem({ type: "task", item: res.message });
        console.log("Task created successfully", res.message);

        try {
          const response = await addTaskToCalendar({ _id: res.message._id });
          if (response.success) {
            console.log("Tarea añadido al calendario:", response.res);
          } else {
            console.error(
              "Error al añadidir la tarea al calendario:",
              response.res
            );
          }
        } catch (calendarError) {
          console.error(
            "Error al comunicarse con el servicio de calendario:",
            calendarError
          );
        }

        setIsOpen("");
      } else {
        setError(
          typeof res.message === "string"
            ? res.message
            : "Error al crear la tarea"
        );
        console.error("Failed to create task", res.message);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          error={error}
          setError={setError}
          task={task}
          setTask={setTask}
        />

        <BtnSend
          handleClick={handleSendTask}
          isLoading={isLoading}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}
