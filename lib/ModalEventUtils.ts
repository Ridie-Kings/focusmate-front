import { tempEventType, TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { Dispatch, SetStateAction } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";

export default function ModalEventUtils({
  setError,
  event,
  setIsLoading,
  setIsOpen,
}: {
  setError: (error: string | null) => void;
  event: tempEventType;
  setIsLoading: (isLoading: boolean) => void;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
}) {
  const { addEvent, updateEvent } = useDashboardStore((state) => state.actions);

  const validateEvent = (): boolean => {
    if (!event.title.trim()) {
      setError("El título es obligatorio");
      return false;
    }

    if (event.endDate && event.startDate && event.endDate <= event.startDate) {
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

    const res = await updateEvent(event._id ?? "", event);

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

    console.log(event);

    const res = await addEvent(event);

    if (!res.success) {
      setError(res.res as string);
      console.log(res);
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
