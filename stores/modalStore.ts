import { create } from "zustand";
import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { SetStateAction } from "react";
import { Dispatch } from "react";

interface ModalStore {
  isOpen: TypeIsOpen;
  actions: {
    setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  };
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: { text: "" },
  actions: {
    setIsOpen: (isOpen) => set({ isOpen: isOpen as TypeIsOpen }),
  },
}));

export const useIsOpen = () => useModalStore((state) => state.isOpen);
