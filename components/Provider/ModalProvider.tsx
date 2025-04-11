"use client";
import { createContext, useState } from "react";

import { ModalContextType } from "@/interfaces/Modal/ModalType";

import Modal from "../Elements/General/Modal";
import { TaskType } from "@/interfaces/Task/TaskType";
import { HabitsType } from "@/interfaces/Habits/HabitsType";

export const ModalContext = createContext<ModalContextType>({
  isOpen: "",
  setIsOpen: () => {},
  item: null,
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState("");
  const [item, setItem] = useState<
    | {
        type: string;
        item: HabitsType | TaskType;
      }
    | undefined
  >();

  const contextValue = {
    item,
    isOpen,
    setIsOpen,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {isOpen !== "" && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} setItem={setItem} />
      )}
      {children}
    </ModalContext.Provider>
  );
}
