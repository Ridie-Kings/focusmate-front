"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

import ModalTask from "./Modal/ModalTask";
import ModalHabit from "./Modal/ModalHabit";
import ModalEvent from "./Modal/ModalEvent";
import ModalContact from "./Modal/ModalContact";

import { X } from "lucide-react";
import { TypeIsOpen } from "@/components/Provider/ModalProvider";
import ModalPomodoroSettings from "./Modal/ModalPomodoroSettings";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import ModalTaskKanban from "./Modal/ModalTaskKanban";

interface ModalProps {
  isOpen: TypeIsOpen;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  profile: ProfileType | null;
}

export default function Modal({ isOpen, setIsOpen, profile }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen({ text: "" });
      setIsClosing(false);
    }, 300);
  };

  const renderModal = () => {
    switch (isOpen.text) {
      case "task":
        return (
          <ModalTask
            setIsOpen={setIsOpen}
            prevTask={isOpen.other as TaskType}
          />
        );
      case "taskKanban":
        return (
          <ModalTaskKanban
            setIsOpen={setIsOpen}
            tasks={
              isOpen.other as {
                column: StatusType;
                setTasks: Dispatch<SetStateAction<TaskType[]>>;
              }
            }
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
            status={isOpen.other as PomodoroStatusType}
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
        handleClose();
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

  if (!isOpen.text) return null;

  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-60">
      <div
        className={`w-[95vw] md:w-[600px] bg-background-primary rounded-2xl p-6 flex flex-col items-end gap-4 drop-shadow-2xl ${
          isClosing ? "animate-modalClose" : "animate-modalOpen"
        } z-10`}
      >
        <X onClick={handleClose} size={28} className="cursor-pointer" />
        {renderModal()}
      </div>
      <div
        className={`fixed left-0 top-0 w-full h-full ${
          isClosing ? "animate-blurEnd" : "animate-blurStart"
        }`}
      />
    </div>
  );
}
