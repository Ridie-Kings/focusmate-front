import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";
import { typeRedirect } from "@/interfaces/Modal/ModalType";
import { TaskType } from "@/interfaces/Task/TaskType";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";

export default function TimelineUtils() {
  const { removeEvent, updateTask, removeTask } = useDashboardStore(
    (state) => state.actions
  );
  const { setIsOpen } = useModalStore((state) => state.actions);
  const { addToast } = useToastStore();

  const handleUpdate = ({
    item,
    redirect,
  }: {
    item: TimelineItem;
    redirect?: typeRedirect;
  }) => {
    const isEvent = item.type === "event";

    if (isEvent) {
      setIsOpen({ text: "event", other: item.data, redirect });
    } else {
      setIsOpen({ text: "task", other: item.data, redirect });
    }
  };

  const handleRemove = async ({ item }: { item: TimelineItem }) => {
    const isEvent = item.type === "event";

    if (isEvent) {
      const res = await removeEvent(item.data._id);
      if (res.success) {
        addToast({
          message: "Evento eliminado correctamente",
          description: "El evento ha sido eliminado correctamente",
          type: "success",
        });
      } else {
        addToast({
          message: "Error al eliminar el evento",
          type: "error",
          description: res.res as string,
        });
      }
    } else {
      const res = await removeTask(item.data._id);
      if (res.success) {
        addToast({
          message: "Tarea eliminada correctamente",
          description: "La tarea ha sido eliminada correctamente",
          type: "success",
        });
      } else {
        addToast({
          message: "Error al eliminar la tarea",
          type: "error",
          description: res.res as string,
        });
      }
    }
  };

  const handleComplete = ({ item }: { item: TimelineItem }) => {
    const isEvent = item.type === "event";

    if (!isEvent) {
      updateTask(item.data._id, {
        status:
          (item.data as TaskType).status === "completed"
            ? "dropped"
            : "completed",
      });
    }
  };
  return {
    handleComplete,
    handleRemove,
    handleUpdate,
  };
}
