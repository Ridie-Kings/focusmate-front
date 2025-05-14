"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

import ModalTask from "./Modal/ModalTask";
import ModalHabit from "./Modal/ModalHabit";
import ModalEvent from "./Modal/ModalEvent";
import ModalContact from "./Modal/ModalContact";

import { X } from "lucide-react";
import { TypeIsOpen } from "@/components/Provider/ModalProvider";
import ModalPomodoroSettings from "./Modal/ModalPomodoroSettings";
import { TaskType } from "@/interfaces/Task/TaskType";
import { PomodoroStatus } from "@/interfaces/websocket/WebSocketProvider";
import { HabitsType } from "@/interfaces/Habits/HabitsType";

interface ModalProps {
  isOpen: TypeIsOpen;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  profile: ProfileType | null;
}

export default function Modal({ isOpen, setIsOpen, profile }: ModalProps) {
  const renderModal = () => {
    switch (isOpen.text) {
      case "task":
        return (
          <ModalTask
            setIsOpen={setIsOpen}
            prevTask={isOpen.other as TaskType}
          />
        );
      case "habit":
        return (
          <ModalHabit
            setIsOpen={setIsOpen}
            prevHabit={isOpen.other as HabitsType}
          />
        );
      case "event":
        return (
          <ModalEvent setIsOpen={setIsOpen} events={isOpen.other as TaskType} />
        );
      case "contact":
        return <ModalContact setIsOpen={setIsOpen} profile={profile} />;
      case "pomodoroSettings":
        return (
          <ModalPomodoroSettings
            status={isOpen.other as PomodoroStatus}
            setIsOpen={setIsOpen}
          />
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    if (isOpen.text) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen({ text: "" });
      }
    };

    if (isOpen.text) {
      window.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-60 bg-black/25 animate-fadeIn">
      <div className="w-[400px] md:w-[600px] bg-background-primary rounded-2xl p-6 flex flex-col items-end gap-4 drop-shadow-2xl animate-modalOpen">
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
