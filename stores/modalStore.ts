import { create } from "zustand";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { SetStateAction } from "react";
import { Dispatch } from "react";

interface ModalStore {
  isOpen: TypeIsOpen;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  profile: ProfileType | null;
  setProfile: Dispatch<SetStateAction<ProfileType | null>>;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: { text: "" },
  setIsOpen: (isOpen) => set({ isOpen: isOpen as TypeIsOpen }),
  profile: null,
  setProfile: (profile) => set({ profile: profile as ProfileType }),
}));
