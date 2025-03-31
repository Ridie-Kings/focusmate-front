import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { Dispatch, DragEvent, SetStateAction, useState } from "react";
import { AddCard } from "./AddCard";
import { DropIndicator } from "@/components/Elements/Pages/Task/dropIndicator";
import { Card } from "./Card";

type StatusProps = {
  title: string;
  cards: TaskType[];
  status: StatusType;
  setCards: Dispatch<SetStateAction<TaskType[]>>;
};

export const Status = ({ title, cards, status, setCards }: StatusProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: TaskType) => {
    e.dataTransfer?.setData("cardId", card._id);
    e.dataTransfer?.setData("originalStatus", card.status);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer?.getData("cardId");
    const originalStatus = e.dataTransfer?.getData(
      "originalStatus"
    ) as StatusType;

    setActive(false);
    clearHighlights();

    if (!cardId) return;

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    let copy = [...cards];

    // Find the card to transfer across ALL cards, not just in the current status
    let cardToTransfer = copy.find((c) => c._id === cardId);
    if (!cardToTransfer) return;

    // Always update the status, even if moving within the same column
    cardToTransfer = { ...cardToTransfer, status };

    // Remove the card from its original location
    copy = copy.filter((c) => c._id !== cardId);

    const moveToBack = before === "-1";

    if (moveToBack) {
      copy.push(cardToTransfer);
    } else {
      const insertAtIndex = copy.findIndex((el) => el._id === before);
      if (insertAtIndex !== -1) {
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
    }

    setCards(copy);
  };

  const handleDragOver = (e: DragEvent) => {
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

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    return indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        }
        return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-status="${status}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.status === status);

  return (
    <div className="flex-1 shrink-0">
      <div className="flex flex-col text-sm border border-primary-green text-primary-green rounded-lg px-3 py-2">
        <h3>{title}</h3>
        <span className="rounded text-sm animate-opacStart">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full transition-colors ${
          active ? "" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => (
          <Card key={c._id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} status={status} />
        <AddCard status={status} setCards={setCards} cards={cards} />
      </div>
    </div>
  );
};
