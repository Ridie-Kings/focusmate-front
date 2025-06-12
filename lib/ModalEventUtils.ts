import { tempEventType } from "@/interfaces/Modal/ModalType";
import { useDashboardStore } from "@/stores/dashboardStore";

export default function ModalEventUtils({
  setError,
  event,
  setIsLoading,
  handleClose,
}: {
  setError: (error: string | null) => void;
  event: tempEventType;
  setIsLoading: (isLoading: boolean) => void;
  handleClose: () => void;
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
    handleClose();
  };

  const handleCreateEvent = async () => {
    setError(null);

    if (!validateEvent()) return;

    setIsLoading(true);

    const res = await addEvent(event);

    if (!res.success) {
      setError(res.res as string);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    handleClose();
  };
  return {
    handleCreateEvent,
    handleUpdateEvent,
  };
}
