"use client";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { Plus, Clock } from "lucide-react";
import { motion } from "motion/react";
import PriorityBadge from "../Elements/General/PriorityBadge";
import Divider from "../Elements/General/Divider";

export default function Task() {
  return (
    <div className="flex-1 w-full flex flex-col text-neutral-50">
      <Board />
    </div>
  );
}

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <>
      <div className="flex h-full w-full gap-3 overflow-auto 2xl:p-12 p-5">
        <Column
          title="Pendientes"
          column="earrings"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="En Progreso"
          column="progress"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="En Revisíon"
          column="revision"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Completados"
          column="done"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="No Completados"
          column="notdone"
          cards={cards}
          setCards={setCards}
        />
      </div>
      {cards.length <= 0 && (
        <p className="text-black flex-1 w-full flex items-center justify-center text-4xl">
          No tienes tareas
        </p>
      )}
    </>
  );
};

type ColumnProps = {
  title: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({ title, cards, column, setCards }: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
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
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="flex-1 shrink-0">
      <div className="mb-3 flex flex-col border-2 rounded-lg px-3 py-2">
        <h3 className={`font-medium text-black`}>{title}</h3>
        <span
          key={filteredCards.length}
          className="rounded text-sm text-neutral-400 animate-opacStart"
        >
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
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const Card = ({
  title,
  id,
  column,
  dueDate,
  priority,
  handleDragStart,
}: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border flex bg-white flex-col gap-4 border-gray-100 border-l-6 text-gray-100 p-3 active:cursor-grabbing"
      >
        <div className="flex place-content-between">
          <div className="flex gap-2">
            <Clock />{" "}
            {dueDate.toLocaleTimeString("es-ES", {
              day: "2-digit",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
          <PriorityBadge priority={priority} />
        </div>
        <Divider />
        <p className="text-lg">{title}</p>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-1 h-1 w-full bg-gray-100 opacity-0"
    />
  );
};

type AddCardProps = {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("high");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
      dueDate: new Date(),
      priority: priority,
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form
          layout
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <select
            onChange={(e) => setPriority(e.target.value)}
            className="text-black w-full border-2 border-black rounded pl-2"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-blue-400 bg-blue-400/20 p-3 text-sm text-black placeholder-blue-300 focus:outline-0 font-medium"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-red-400 hover:bg-red-100 rounded transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 border-2 cursor-pointer text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <Plus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center justify-center border-2 cursor-pointer border-gray-100 rounded-md gap-1.5 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-gray-100 hover:text-white font-medium"
        >
          <Plus />
          <span>Add card</span>
        </motion.button>
      )}
    </>
  );
};

type ColumnType = "earrings" | "progress" | "revision" | "done" | "notdone";

type CardType = {
  title: string;
  id: string;
  column: ColumnType;
  priority: "high" | "medium" | "low";
  dueDate: Date;
};

const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  // {
  //   title: "Look into render bug in dashboard",
  //   id: "1",
  //   column: "earrings",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
  // {
  //   title: "SOX compliance checklist",
  //   id: "2",
  //   column: "earrings",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
  // {
  //   title: "[SPIKE] Migrate to Azure",
  //   id: "3",
  //   column: "earrings",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
  // {
  //   title: "Document Notifications service",
  //   id: "4",
  //   column: "earrings",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
  // // TODO
  // {
  //   title: "Research DB options for new microservice",
  //   id: "5",
  //   column: "progress",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
  // {
  //   title: "Postmortem for outage",
  //   id: "6",
  //   column: "progress",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
  // {
  //   title: "Sync with product on Q3 roadmap",
  //   id: "7",
  //   column: "progress",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
  // // DOING
  // {
  //   title: "Refactor context providers to use Zustand",
  //   id: "8",
  //   column: "revision",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
  // {
  //   title: "Add logging to daily CRON",
  //   id: "9",
  //   column: "done",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
  // // DONE
  // {
  //   title: "Set up DD dashboards for Lambda listener",
  //   id: "10",
  //   column: "notdone",
  //   priority: "high",
  //   dueDate: new Date(),
  // },
];
