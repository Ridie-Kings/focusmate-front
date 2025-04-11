import { Dispatch, SetStateAction, useState } from "react";

import { Bell, Calendar, Text, Timer } from "lucide-react";

import InputModal from "@/components/Reusable/InputModal";
import ModalDatePicker from "./ModalDatePicker/ModalDatePicker";
import ModalPriorityPicker from "./ModalPriorityPicker/ModalPriorityPicker";
import Button from "@/components/Reusable/Button";
import ModalColorPicker from "./ModalColorPicker/ModalColorPicker";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { createTask } from "@/services/Task/createTask";
import { addTaskToCalendar } from "@/services/Calendar/addTaskToCalendar";

export default function ModalTask({
  setIsOpen,
  setItem,
}: {
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: (data: { type: string; item: TaskType }) => void;
}) {
  const [task, setTask] = useState<{
    title: string;
    description: string;
    status: StatusType;
    startDate: Date;
    endDate: Date;
    dueDate: Date;
    priority: "high" | "medium" | "low";
    tags: string[];
  }>({
    title: "",
    description: "",
    status: "pending",
    startDate: new Date(),
    endDate: new Date(),
    dueDate: new Date(),
    priority: "high",
    tags: [],
  });

  const handleSendTask = async () => {
    const res = await createTask({ task });

    if (res.success) {
      setItem({ type: "task", item: res.message });
      console.log("Task created successfully", res.message);
      setIsOpen("");
      const response = await addTaskToCalendar({ _id: res.message._id });
      if (res.success) {
        console.log("Tarea añadido al calendario:", response.res);
      } else {
        console.error("Error al añadidir la tarea al calendario");
      }
    } else {
      console.log("Failed to create task", res.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full place-content-between">
          <input
            type="text"
            placeholder="Titulo"
            className="text-2xl text-gray-500 outline-none"
            onChange={(e) =>
              setTask((prev) => ({ ...prev, title: e.target.value }))
            }
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
            placeholder="Descripcíon"
            icon={<Text />}
          />
          <InputModal
            type="select"
            placeholder="10 min. antes"
            option={
              <div className="absolute top-7 flex flex-col bg-background-primary drop-shadow-lg rounded-lg p-2 gap-1">
                {["10", "15", "20"]?.map((item) => (
                  <option key={item} className="p-2">
                    {item} min. antes
                  </option>
                ))}
              </div>
            }
            icon={<Bell />}
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
            icon={<Calendar />}
          />
          <div className="flex">
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
              icon={<Timer />}
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
              icon={<Timer />}
            />
          </div>
          <InputModal
            type="select"
            placeholder={task?.priority ? task.priority : "Prioridad"}
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
        <div className="flex py-2 gap-2.5">
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
            Guardar
          </Button>
        </div>
      </div>
    </>
  );
}
