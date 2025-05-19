import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AlertCircle, Award, Text } from "lucide-react";

import BtnSend from "./Modal/BtnSend";
import InputModal from "@/components/Reusable/InputModal";
import ModalPriorityPicker from "./ModalPriorityPicker/ModalPriorityPicker";
import TopInputs from "./Modal/TopInputs";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import { TypeIsOpen } from "@/components/Provider/ModalProvider";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import ModalTaskUtils from "@/lib/Task/ModalTaskUtils";

export default function ModalTaskKanban({
  setIsOpen,
  tasks,
}: {
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  tasks: { column: StatusType; setTasks: Dispatch<SetStateAction<TaskType[]>> };
}) {
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
  const { handleSendTask, handleUpdateTask, trad } = ModalTaskUtils({
    setError,
    setTasks: tasks.setTasks,
    task,
    setIsLoading,
    setIsOpen,
  });

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
