import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { AlertCircle } from "lucide-react";

import BodyInputs from "./ModalEvent/BodyInputs";
import BtnSend from "./Modal/BtnSend";
import TopInputs from "./Modal/TopInputs";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import EventUtils from "@/lib/EventUtils";

type ModalEventProps = {
  isOpen: { text: string; other?: unknown };
  setIsOpen: Dispatch<SetStateAction<{ text: string; other?: unknown }>>;
};

const DEFAULT_TASK: tempTaskType = {
  _id: undefined,
  title: "",
  description: "",
  status: "pending",
  startDate: new Date(),
  endDate: new Date(),
  dueDate: new Date(),
  priority: "high",
  color: "#d5ede2",
};

export default function ModalEvent({ setIsOpen, isOpen }: ModalEventProps) {
  const { setEvents, setTasks } = useContext(DashboardContext);

  const initialDate = useMemo(
    () => (isOpen.other instanceof Date ? isOpen.other : new Date()),
    [isOpen.other]
  );

  const [task, setTask] = useState<tempTaskType>({
    ...DEFAULT_TASK,
    startDate: initialDate,
    endDate: initialDate,
    dueDate: initialDate,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { handleSendTask, handleUpdateTask } = EventUtils({
    setEvents,
    setTasks,
    setIsOpen,
    setError,
    setIsLoading,
    task,
  });

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

  const isEditMode = Boolean(task._id);

  return (
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
        date={initialDate}
        error={error}
        setError={setError}
        task={task}
        setTask={setTask}
      />

      <BtnSend
        text={isEditMode ? "Modificar" : undefined}
        loadingText={isEditMode ? "Modificando..." : undefined}
        handleClick={isEditMode ? handleUpdateTask : handleSendTask}
        isLoading={isLoading}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
