import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { updateTask } from "@/services/Task/updateTask";
import { Dispatch, SetStateAction } from "react";

export default function KanbanUtils({
  setActive,
  cards,
  setCards,
  status,
}: {
  setActive: Dispatch<SetStateAction<boolean>>;
  cards: TaskType[];
  setCards: Dispatch<SetStateAction<TaskType[]>>;
  status: StatusType;
}) {
  const handleDragStart = (e: React.DragEvent, card: TaskType) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("cardId", card._id);
    }
  };

  const handleDragEnd = async (e: React.DragEvent) => {
    const cardId = e.dataTransfer?.getData("cardId") || "";

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c._id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status };

      copy = copy.filter((c) => c._id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        if (cardToTransfer) {
          copy.push(cardToTransfer);
        }
      } else {
        const insertAtIndex = copy.findIndex((el) => el._id === before);
        if (insertAtIndex === undefined) return;

        if (cardToTransfer) {
          copy.splice(insertAtIndex, 0, cardToTransfer);
        }
      }

      setCards(copy);
      try {
        const response = await updateTask({
          _id: cardId,
          task: { status: cardToTransfer.status },
        });

        if (response.success) console.log("Modifier");
        else {
          console.error(
            "Erreur lors de la mise à jour du statut de la tâche",
            response.res
          );
        }
      } catch (error) {
        console.error("Erreur lors de la communication avec l'API:", error);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: React.DragEvent,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${status}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  return {
    handleDragEnd,
    handleDragLeave,
    handleDragOver,
    handleDragStart,
  };
}
