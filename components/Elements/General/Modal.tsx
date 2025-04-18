"use client";
import { Dispatch, SetStateAction } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

import ModalTask from "./Modal/ModalTask";
import ModalHabit from "./Modal/ModalHabit";
import ModalEvent from "./Modal/ModalEvent";
import ModalContact from "./Modal/ModalContact";

import { X } from "lucide-react";

interface ModalProps {
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
  profile: ProfileType | null;
}

export default function Modal({ isOpen, setIsOpen, profile }: ModalProps) {
  const renderModal = () => {
    switch (isOpen) {
      case "task":
        return <ModalTask setIsOpen={setIsOpen} />;
      case "habit":
        return <ModalHabit setIsOpen={setIsOpen} />;
      case "event":
        return <ModalEvent setIsOpen={setIsOpen} />;
      case "contact":
        return <ModalContact setIsOpen={setIsOpen} profile={profile} />;
      default:
        return "";
    }
  };

  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-60 bg-black/25">
      <div className="w-[600px] bg-background-primary rounded-2xl p-6 flex flex-col items-end gap-4 drop-shadow-2xl">
        <X onClick={() => setIsOpen("")} size={28} className="cursor-pointer" />
        {renderModal()}
      </div>
    </div>
  );
}
