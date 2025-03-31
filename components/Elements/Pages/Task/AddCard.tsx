"use client";

import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";

type AddCardProps = {
  status: StatusType;
  setCards: Dispatch<SetStateAction<TaskType[]>>;
};

export const AddCard = ({ status, setCards }: AddCardProps) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("high");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: TaskType = {
      status,
      title: text.trim(),
      _id: Math.random().toString(),
      dueDate: new Date(),
      priority: priority,
      userId: "defaultUserId",
      description: "",
      isDeleted: false,
      tags: [],
      subTasks: [],
      category: "",
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
            onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
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
          className="flex w-full items-center justify-center border cursor-pointer gap-2 p-2 transition-colors  border-primary-green rounded-lg bg-secondary-green/25 text-primary-green"
        >
          <Plus />
          <span>Nueva Tarea</span>
        </motion.button>
      )}
    </>
  );
};
