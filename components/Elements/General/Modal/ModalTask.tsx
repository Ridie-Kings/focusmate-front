import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AlertCircle, Award, Text } from "lucide-react";

import { createTask } from "@/services/Task/createTask";
import BtnSend from "./Modal/BtnSend";
import InputModal from "@/components/Reusable/InputModal";
import ModalPriorityPicker from "./ModalPriorityPicker/ModalPriorityPicker";
import TopInputs from "./Modal/TopInputs";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { DashboardContext } from "@/components/Provider/DashboardProvider";

export default function ModalTask({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<{ text: string; other?: any }>>;
}) {
  const { setTasks } = useContext(DashboardContext);

  const [task, setTask] = useState<tempTaskType>({
    title: "",
    description: "",
    status: "pending",
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

    if (task.endDate && task.startDate) {
      if (task.endDate <= task.startDate) {
        setError(
          "La hora de finalización debe ser posterior a la hora de inicio"
        );
        return false;
      }
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
        setTasks((prev) => [...prev, res.message]);
        console.log("Task created successfully", res.message);
        setIsOpen({ text: "" });
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

  const trad = () => {
    switch (task.priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Media";
      case "low":
        return "Baja";
      default:
        return "";
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
        <div className="flex flex-col gap-6 w-full">
          <InputModal
            onChange={(e) =>
              setTask((prev) => ({ ...prev, description: e.target.value }))
            }
            type="text"
            placeholder="Descripción"
            icon={<Text />}
          />
          <InputModal
            type="select"
            placeholder={task?.priority ? trad() : "Estado"}
            option={
              <ModalPriorityPicker
                top="20px"
                onChange={(e) =>
                  setTask((prev) => ({
                    ...prev,
                    priority: e.target.value as "high" | "medium" | "low",
                  }))
                }
              />
            }
            icon={<Award />}
          />
        </div>

        <BtnSend
          handleClick={handleSendTask}
          isLoading={isLoading}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}
