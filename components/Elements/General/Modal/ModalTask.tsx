import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AlertCircle, Award, Text } from "lucide-react";

import BtnSend from "./Modal/BtnSend";
import InputModal from "@/components/Reusable/InputModal";
import ModalPriorityPicker from "./ModalPriorityPicker/ModalPriorityPicker";
import TopInputs from "./Modal/TopInputsTasks";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { useDashboardStore } from "@/stores/dashboardStore";
import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { TaskType } from "@/interfaces/Task/TaskType";
import ModalTaskUtils from "@/lib/Task/ModalTaskUtils";
import { useTranslations } from "next-intl";

export default function ModalTask({
  setIsOpen,
  prevTask,
}: {
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  prevTask: TaskType;
}) {
  const { addTask, updateTask } = useDashboardStore((state) => state.actions);
  const isLoading = useDashboardStore((state) => state.loading.tasks);
  const t = useTranslations("Modal.task");
  const tCommon = useTranslations("Common");

  const [task, setTask] = useState<tempTaskType>({
    _id: undefined,
    title: "",
    description: "",
    status: "pending",
    priority: "high",
    color: "#d5ede2",
  });
  const isEditMode = Boolean(task._id);

  const [error, setError] = useState<string | null>(null);
  const { trad } = ModalTaskUtils({ task });

  useEffect(() => {
    if (prevTask && prevTask instanceof Object && "title" in prevTask) {
      setTask(() => ({
        ...(prevTask as tempTaskType),
      }));
    }
  }, [prevTask]);

  const handleSendTask = () => {
    addTask(task);
    setIsOpen({ text: "" });
  };

  const handleUpdateTask = async () => {
    const res = await updateTask(task._id ?? "", task);

    if (res.success) setIsOpen({ text: "" });
    else setError(res.res as string);
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
            placeholder={t("description")}
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
