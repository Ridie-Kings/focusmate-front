"use client";
import { createContext, useState } from "react";

import { ModalContextType } from "@/interfaces/Modal/ModalType";

import Modal from "../Elements/General/Modal";

export const ModalContext = createContext<ModalContextType>({
  isOpen: "",
  setIsOpen: () => {},
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState("");

  const contextValue = {
    isOpen,
    setIsOpen,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {isOpen !== "" && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {children}
    </ModalContext.Provider>
  );
}
