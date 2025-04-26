"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

import ModalTask from "./Modal/ModalTask";
import ModalHabit from "./Modal/ModalHabit";
import ModalEvent from "./Modal/ModalEvent";
import ModalContact from "./Modal/ModalContact";

import { X } from "lucide-react";

interface ModalProps {
  isOpen: { text: string; other?: unknown };
  setIsOpen: Dispatch<SetStateAction<{ text: string; other?: unknown }>>;
  profile: ProfileType | null;
}

export default function Modal({ isOpen, setIsOpen, profile }: ModalProps) {
  const renderModal = () => {
    switch (isOpen.text) {
      case "task":
        return <ModalTask setIsOpen={setIsOpen} />;
      case "habit":
        return <ModalHabit setIsOpen={setIsOpen} />;
      case "event":
        return <ModalEvent setIsOpen={setIsOpen} isOpen={isOpen} />;
      case "contact":
        return <ModalContact setIsOpen={setIsOpen} profile={profile} />;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-60 bg-black/25">
      <div className="w-[400px] md:w-[600px] bg-background-primary rounded-2xl p-6 flex flex-col items-end gap-4 drop-shadow-2xl">
        <X
          onClick={() => setIsOpen({ text: "" })}
          size={28}
          className="cursor-pointer"
        />
        {renderModal()}
      </div>
    </div>
  );
}
