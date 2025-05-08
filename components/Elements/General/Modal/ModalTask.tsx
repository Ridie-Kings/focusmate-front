import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AlertCircle, Award, Text } from "lucide-react";

import { createTask } from "@/services/Task/createTask";
import BtnSend from "./Modal/BtnSend";
import InputModal from "@/components/Reusable/InputModal";
import ModalPriorityPicker from "./ModalPriorityPicker/ModalPriorityPicker";
import TopInputs from "./Modal/TopInputs";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import { updateTask } from "@/services/Task/updateTask";
import { TypeIsOpen } from "@/components/Provider/ModalProvider";

export default function ModalTask({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  isOpen: TypeIsOpen;
}) {
  const { setTasks } = useContext(DashboardContext);

  const [task, setTask] = useState<tempTaskType>({
    _id: undefined,
    title: "",
    description: "",
    status: "pending",
    priority: "high",
    color: "#d5ede2",
  });
  const isEditMode = Boolean(task._id);

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
            defaultValue={task.description}
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
          text={isEditMode ? "Modificar" : undefined}
          loadingText={isEditMode ? "Modificando..." : undefined}
          handleClick={isEditMode ? handleUpdateTask : handleSendTask}
          isLoading={isLoading}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}
