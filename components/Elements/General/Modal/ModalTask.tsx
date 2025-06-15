import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AlertCircle, Award, Calendar, Text, Timer } from "lucide-react";

import BtnSend from "./Modal/BtnSend";
import InputModal from "@/components/Reusable/InputModal";
import ModalPriorityPicker from "./ModalPriorityPicker/ModalPriorityPicker";
import TopInputsTasks from "./Modal/TopInputsTasks";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { useDashboardStore } from "@/stores/dashboardStore";
import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { TaskType } from "@/interfaces/Task/TaskType";
import ModalTaskUtils from "@/lib/Task/ModalTaskUtils";
import { useLocale, useTranslations } from "next-intl";
import ModalDatePicker from "./ModalDatePicker/ModalDatePicker";
import { enUS, es } from "date-fns/locale";
import { format } from "date-fns";
import Switch from "@/components/Reusable/Switch";
import ModalTimePicker from "./ModalTimePicker/ModalTimePicker";

export default function ModalTask({
  setIsOpen,
  prevTask,
  handleClose,
}: {
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  prevTask: TaskType;
  handleClose: () => void;
}) {
  const { addTask, updateTask } = useDashboardStore((state) => state.actions);
  const isLoading = useDashboardStore((state) => state.loading.tasks);

  const t = useTranslations("Modal.task");
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  const [task, setTask] = useState<tempTaskType>({
    _id: undefined,
    title: "",
    description: "",
    status: "pending",
    priority: "high",
    dueDate: undefined,
    color: "#d5ede2",
  });
  const isEditMode = Boolean(task._id);

  // const [isAllDay, setIsAllDay] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trad } = ModalTaskUtils({ task });
  const [addTaskToCalendar, setAddTaskToCalendar] = useState(false);

  useEffect(() => {
    if (prevTask && prevTask instanceof Object && "title" in prevTask) {
      setTask(() => ({
        ...(prevTask as tempTaskType),
      }));
    }
  }, [prevTask]);

  const handleSendTask = async () => {
    const res = await addTask(task, addTaskToCalendar);

    if (res.success) handleClose();
    else setError(res.res as string);
  };

  const handleUpdateTask = async () => {
    const res = await updateTask(task._id ?? "", task);

    if (res.success) handleClose();
    else setError(res.res as string);
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <TopInputsTasks
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
            placeholder={t("description")}
            icon={<Text />}
          />
          {/* <div className="flex items-center place-content-between w-full gap-2 -mb-4">
            <p>Todo el dia</p>
            <Switch
              value={isAllDay}
              onChange={(e) => {
                setIsAllDay(e);
                setTask((prev) => ({
                  ...prev,
                  dueDate: prev.dueDate
                    ? new Date(prev.dueDate?.setHours(0, 0, 0, 0))
                    : prev.dueDate,
                }));
              }}
            />
          </div> */}
          <InputModal
            type="select"
            placeholder={
              task.dueDate
                ? format(task.dueDate, "dd MMMM yyyy", {
                    locale: locale === "es" ? es : enUS,
                  })
                : "Fecha de vencimiento"
            }
            option={
              <ModalDatePicker
                date={task.dueDate ?? new Date()}
                onChange={(e) => {
                  setTask((prev) => ({
                    ...prev,
                    dueDate: e.target.value
                      ? new Date(e.target.value)
                      : undefined,
                  }));
                }}
              />
            }
            propagand={false}
            icon={<Calendar />}
          />
          {task.dueDate && (
            <InputModal
              type="select"
              placeholder={format(task.dueDate ?? new Date(), "HH:mm", {
                locale: locale === "es" ? es : enUS,
              })}
              option={
                <ModalTimePicker
                  defaultValue={task.dueDate}
                  onChange={(e) => {
                    const newDueDate = new Date(task.dueDate ?? new Date());
                    newDueDate.setHours(
                      e.target.value.hours,
                      e.target.value.min,
                      0,
                      0
                    );
                    setTask((prev) => ({
                      ...prev,
                      dueDate: newDueDate,
                    }));
                    if (error) setError(null);
                  }}
                />
              }
              icon={<Timer />}
              propagand={true}
            />
          )}
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
          {!prevTask && (
            <div className="flex items-center place-content-between gap-2">
              <span>Agregar al calendario</span>
              <Switch
                value={addTaskToCalendar}
                onChange={(e) => setAddTaskToCalendar(e)}
              />
            </div>
          )}
        </div>

        <BtnSend
          text={isEditMode ? tCommon("save") : undefined}
          loadingText={isEditMode ? tCommon("saveLoading") : undefined}
          handleClick={isEditMode ? handleUpdateTask : handleSendTask}
          isLoading={isLoading}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}
