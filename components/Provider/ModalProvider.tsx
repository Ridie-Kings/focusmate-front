"use client";
import { createContext, useState } from "react";

import { ModalContextType } from "@/interfaces/Modal/ModalType";

import Modal from "../Elements/General/Modal";

export const ModalContext = createContext<ModalContextType>({
  isOpen: "",
  setIsOpen: () => {},
  item: null,
  setItem: () => {},
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState("");
  const [item, setItem] = useState<unknown>();

  const contextValue = {
    item,
    isOpen,
    setIsOpen,
    setItem,
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
