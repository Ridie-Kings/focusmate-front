import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Bell, Calendar, Text, Timer } from "lucide-react";

import InputModal from "@/components/Reusable/InputModal";
import ModalDatePicker from "./ModalDatePicker/ModalDatePicker";
import ModalPriorityPicker from "./ModalPriorityPicker/ModalPriorityPicker";
import Button from "@/components/Reusable/Button";
import ModalColorPicker from "./ModalColorPicker/ModalColorPicker";
import ModalTimePicker from "./ModalTimePicker/ModalTimePicker";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { createTask } from "@/services/Task/createTask";
import { addTaskToCalendar } from "@/services/Calendar/addTaskToCalendar";

export default function ModalTask({
  setIsOpen,
  setItem,
  initialTask,
}: {
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: (data: { type: string; item: TaskType }) => void;
  initialTask?: Partial<TaskType>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [task, setTask] = useState<{
    title: string;
    description: string;
    status: StatusType;
    startDate: Date;
    startTime: { hours: number; min: number; seg: number };
    endDate: Date;
    endTime: { hours: number; min: number; seg: number };
    dueDate: Date;
    priority: "high" | "medium" | "low";
    tags: string[];
    color?: string;
  }>({
    title: "",
    description: "",
    status: "pending",
    startDate: new Date(),
    startTime: { hours: 9, min: 0, seg: 0 },
    endDate: new Date(),
    endTime: { hours: 10, min: 0, seg: 0 },
    dueDate: new Date(),
    priority: "high",
    tags: [],
    color: "#4F46E5",
  });

  useEffect(() => {
    if (initialTask) {
      setTask((prev) => ({
        ...prev,
        ...initialTask,
        startTime: initialTask?.startTime || prev.startTime,
        endTime: initialTask.endTime || prev.endTime,
      }));
    }
  }, [initialTask]);

  const isFormValid = () => {
    if (!task.title.trim()) {
      setError("El título es obligatorio");
      return false;
    }

    const startDateTime = new Date(task.startDate);
    startDateTime.setHours(task.startTime.hours, task.startTime.min);

    const endDateTime = new Date(task.endDate);
    endDateTime.setHours(task.endTime.hours, task.endTime.min);

    if (endDateTime <= startDateTime) {
      setError(
        "La fecha/hora de fin debe ser posterior a la fecha/hora de inicio"
      );
      return false;
    }

    return true;
  };

  const handleSendTask = async () => {
    if (!isFormValid()) return;

    setLoading(true);
    setError("");

    try {
      const formattedTask = {
        ...task,
        startDate: new Date(task.startDate),
        endDate: new Date(task.endDate),
      };

      formattedTask.startDate.setHours(
        task.startTime.hours,
        task.startTime.min,
        0
      );
      formattedTask.endDate.setHours(task.endTime.hours, task.endTime.min, 0);

      const res = await createTask({ task: formattedTask });

      if (res.success) {
        setItem({ type: "task", item: res.message });

        try {
          const calendarResponse = await addTaskToCalendar({
            _id: res.message._id,
          });
          if (!calendarResponse.success) {
            console.warn("Tarea creada pero no añadida al calendario");
          }
        } catch (calendarError) {
          console.error(
            "Error al añadir la tarea al calendario:",
            calendarError
          );
        }

        setIsOpen("");
      } else {
        setError(String(res.message) || "Error al crear la tarea");
      }
    } catch (err) {
      setError("Error de conexión. Intente nuevamente.");
      console.error("Error en la creación de tarea:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTimeChange = (e: { target: { value: string } }): void => {
    const timeString: string = e.target.value;
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    setTask((prev) => ({
      ...prev,
      startTime: {
        hours: hours || 0,
        min: minutes || 0,
        seg: seconds || 0,
      },
    }));
  };

  const handleEndTimeChange = (e: { target: { value: string } }) => {
    const timeString = e.target.value;
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    setTask((prev) => ({
      ...prev,
      endTime: {
        hours: hours || 0,
        min: minutes || 0,
        seg: seconds || 0,
      },
    }));
  };

  const reminderOptions = [
    { value: "10", label: "10 min. antes" },
    { value: "15", label: "15 min. antes" },
    { value: "20", label: "20 min. antes" },
    { value: "30", label: "30 min. antes" },
    { value: "60", label: "1 hora antes" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2">
          {error}
        </div>
      )}

      <div className="flex w-full place-content-between items-center">
        <input
          type="text"
          placeholder="Título de la tarea"
          className="text-2xl text-gray-700 outline-none w-full"
          value={task.title}
          onChange={(e) => {
            setTask((prev) => ({ ...prev, title: e.target.value }));
            setError("");
          }}
        />
        <ModalColorPicker
          onChange={(e) =>
            setTask((prev) => ({ ...prev, color: e.target.value }))
          }
        />
      </div>

      <div className="flex flex-col gap-6 w-full">
        <InputModal
          onChange={(e) =>
            setTask((prev) => ({ ...prev, description: e.target.value }))
          }
          type="text"
          placeholder="Descripción"
          icon={<Text className="text-gray-500" />}
        />

        <InputModal
          type="select"
          placeholder="10 min. antes"
          option={
            <div className="absolute top-7 left-0 flex flex-col bg-background-primary drop-shadow-lg rounded-lg p-2 gap-1 z-10 min-w-full">
              {reminderOptions.map((item) => (
                <div
                  key={item.value}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() =>
                    setTask((prev) => ({
                      ...prev,
                      dueDate: new Date(item.value),
                    }))
                  }
                >
                  {item.label}
                </div>
              ))}
            </div>
          }
          icon={<Bell className="text-gray-500" />}
        />

        <InputModal
          type="select"
          placeholder={format(task?.dueDate ?? new Date(), "dd MMMM yyyy", {
            locale: es,
          })}
          option={
            <ModalDatePicker
              onChange={(e) =>
                setTask((prev) => ({
                  ...prev,
                  dueDate: new Date(e.target.value),
                }))
              }
            />
          }
          icon={<Calendar className="text-gray-500" />}
        />

        <div className="flex w-full gap-4">
          <InputModal
            type="select"
            placeholder={`${String(task.startTime.hours).padStart(
              2,
              "0"
            )}:${String(task.startTime.min).padStart(2, "0")}`}
            option={
              <ModalTimePicker
                initialTime={task.startTime}
                onChange={handleStartTimeChange}
              />
            }
            icon={<Timer className="text-gray-500" />}
          />

          <InputModal
            type="select"
            placeholder={`${String(task.endTime.hours).padStart(
              2,
              "0"
            )}:${String(task.endTime.min).padStart(2, "0")}`}
            option={
              <ModalTimePicker
                initialTime={task.endTime}
                onChange={handleEndTimeChange}
              />
            }
            icon={<Timer className="text-gray-500" />}
          />
        </div>

        <InputModal
          type="select"
          placeholder={
            task?.priority
              ? task.priority === "high"
                ? "Alta prioridad"
                : task.priority === "medium"
                ? "Media prioridad"
                : "Baja prioridad"
              : "Prioridad"
          }
          option={
            <ModalPriorityPicker
              onChange={(e) =>
                setTask((prev) => ({
                  ...prev,
                  priority: e.target.value as "high" | "medium" | "low",
                }))
              }
            />
          }
          icon=""
        />
      </div>

      <div className="flex py-2 gap-2.5 mt-2">
        <Button
          size="large"
          button="secondary"
          type="button"
          onClick={() => setIsOpen("")}
        >
          Cancelar
        </Button>
        <Button
          size="large"
          onClick={handleSendTask}
          button="primary"
          type="button"
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </div>
  );
}
