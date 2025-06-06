import { tempTaskType, TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { Dispatch, SetStateAction } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";

export default function ModalEventUtils({
  setError,
  task,
  setIsLoading,
  setIsOpen,
}: {
  setError: (error: string | null) => void;
  task: tempTaskType;
  setIsLoading: (isLoading: boolean) => void;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
}) {
  const { addEvent, updateEvent } = useDashboardStore((state) => state.actions);

  const validateEvent = (): boolean => {
    if (!task.title.trim()) {
      setError("El título es obligatorio");
      return false;
    }

    if (task.endDate && task.startDate && task.endDate <= task.startDate) {
      setError(
        "La hora de finalización debe ser posterior a la hora de inicio"
      );
      return false;
    }

    return true;
  };

  const handleUpdateEvent = async () => {
    setError(null);

    if (!validateEvent()) {
      return;
    }
    setIsLoading(true);

    const res = await updateEvent(task._id ?? "", task);

    if (!res.success) {
      setError(res.res as string);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsOpen({ text: "" });
  };

  const handleCreateEvent = async () => {
    setError(null);

    if (!validateEvent()) return;

    setIsLoading(true);

    const res = await addEvent(task);

    if (!res.success) {
      setError(res.res as string);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsOpen({ text: "" });
  };
  return {
    handleCreateEvent,
    handleUpdateEvent,
  };
}
