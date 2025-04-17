import { Dispatch, SetStateAction } from "react";
import InputModal from "@/components/Reusable/InputModal";
import { Award, Bell, Calendar, Text, Timer } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ModalDatePicker from "../ModalDatePicker/ModalDatePicker";
import ModalTimePicker from "../ModalTimePicker/ModalTimePicker";
import ModalPriorityPicker from "../ModalPriorityPicker/ModalPriorityPicker";
import { tempTaskType } from "@/interfaces/Modal/ModalType";

export default function BodyInputs({
  error,
  task,
  setTask,
  setError,
}: {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  task: tempTaskType;
  setTask: Dispatch<SetStateAction<tempTaskType>>;
}) {
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
        placeholder="10 min. antes"
        option={
          <div className="absolute top-7 flex flex-col bg-background-primary drop-shadow-lg rounded-lg p-2 gap-1 z-50">
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
        placeholder={format(
          task.dueDate instanceof Date && !isNaN(task.dueDate.getTime())
            ? task.dueDate
            : new Date(),
          "dd MMMM yyyy",
          {
            locale: es,
          }
        )}
        option={
          <ModalDatePicker
            onChange={(e) =>
              setTask((prev) => ({
                ...prev,
                startDate: new Date(e.target.value),
                dueDate: new Date(e.target.value),
                endDate: new Date(e.target.value),
              }))
            }
          />
        }
        propagand={false}
        icon={<Calendar />}
      />
      <div className="flex">
        <InputModal
          type="select"
          placeholder={format(
            task.startDate instanceof Date && !isNaN(task.startDate.getTime())
              ? task.startDate
              : new Date(),
            "HH:mm",
            { locale: es }
          )}
          option={
            <ModalTimePicker
              onChange={(e) => {
                const newStartDate = new Date(task.startDate ?? new Date());
                newStartDate.setHours(
                  e.target.value.hours,
                  e.target.value.min,
                  0,
                  0
                );
                setTask((prev) => ({
                  ...prev,
                  startDate: newStartDate,
                }));
                if (error) setError(null);
              }}
            />
          }
          icon={<Timer />}
          propagand={false}
        />
        <InputModal
          type="select"
          placeholder={format(
            task.endDate instanceof Date && !isNaN(task.endDate.getTime())
              ? task.endDate
              : new Date(),
            "HH:mm",
            { locale: es }
          )}
          option={
            <ModalTimePicker
              onChange={(e) => {
                const newEndDate = new Date(task.endDate ?? new Date());
                newEndDate.setHours(
                  e.target.value.hours,
                  e.target.value.min,
                  0,
                  0
                );

                setTask((prev) => ({
                  ...prev,
                  endDate: newEndDate,
                }));
                if (error) setError(null);
              }}
            />
          }
          icon={<Timer />}
          propagand={false}
        />
      </div>
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
  );
}
