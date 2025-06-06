import { Dispatch, SetStateAction } from "react";
import InputModal from "@/components/Reusable/InputModal";
import { Award, Calendar, Text, Timer } from "lucide-react";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import ModalDatePicker from "../ModalDatePicker/ModalDatePicker";
import ModalTimePicker from "../ModalTimePicker/ModalTimePicker";
import ModalPriorityPicker from "../ModalPriorityPicker/ModalPriorityPicker";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { useLocale, useTranslations } from "next-intl";

export default function BodyInputs({
  error,
  task,
  setTask,
  setError,
  date,
}: {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  task: tempTaskType;
  setTask: Dispatch<SetStateAction<tempTaskType>>;
  date: Date;
}) {
  const tCommon = useTranslations("Common");
  const tPriority = useTranslations("Modal.event.priority");
  const locale = useLocale();
  const trad = () => {
    switch (task.priority) {
      case "high":
        return tPriority("high");
      case "medium":
        return tPriority("medium");
      case "low":
        return tPriority("low");
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <InputModal
        defaultValue={task.description}
        onChange={(e) =>
          setTask((prev) => ({ ...prev, description: e.target.value }))
        }
        type="text"
        placeholder={tCommon("description")}
        icon={<Text />}
      />
      {/* <InputModal
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
      /> */}
      <InputModal
        type="select"
        placeholder={format(task.dueDate ?? new Date(), "dd MMMM yyyy", {
          locale: locale === "es" ? es : enUS,
        })}
        option={
          <ModalDatePicker
            date={date}
            onChange={(e) => {
              setTask((prev) => ({
                ...prev,
                startDate: new Date(e.target.value),
                dueDate: new Date(e.target.value),
                endDate: new Date(e.target.value),
              }));
            }}
          />
        }
        propagand={false}
        icon={<Calendar />}
      />
      <div className="flex">
        <InputModal
          type="select"
          placeholder={format(task.startDate ?? new Date(), "HH:mm", {
            locale: locale === "es" ? es : enUS,
          })}
          option={
            <ModalTimePicker
              defaultValue={task.startDate}
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
          propagand={true}
        />
        <InputModal
          type="select"
          placeholder={format(task.endDate ?? new Date(), "HH:mm", {
            locale: es,
          })}
          option={
            <ModalTimePicker
              defaultValue={task.endDate}
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
          propagand={true}
        />
      </div>
      <InputModal
        type="select"
        defaultValue={task.priority}
        placeholder={task?.priority ? trad() : tCommon("status")}
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
