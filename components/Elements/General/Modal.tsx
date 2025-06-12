"use client";
import { useEffect, useState } from "react";

import ModalTask from "./Modal/ModalTask";
import ModalHabit from "./Modal/ModalHabit";
import ModalEvent from "./Modal/ModalEvent";
import ModalContact from "./Modal/ModalContact";

import { X } from "lucide-react";
import ModalPomodoroSettings from "./Modal/ModalPomodoroSettings";
import { TaskType } from "@/interfaces/Task/TaskType";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import ModalTaskKanban from "./Modal/ModalTaskKanban";
import { useIsOpen, useModalStore } from "@/stores/modalStore";
import { useProfile } from "@/stores/profileStore";
import { EventType } from "@/interfaces/Calendar/EventType";
import ModalDeleteAccount from "./Modal/ModalDeleteAccount";
import ModalShowMore from "./Modal/ModalShowMore";

export default function Modal() {
  const isOpen = useIsOpen();
  const profile = useProfile();
  const { setIsOpen } = useModalStore((state) => state.actions); // TODO: añadirlo en cada uno de los modales

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen({
        text: isOpen.redirect?.text ? isOpen.redirect.text : "",
        other: isOpen.redirect?.other ? isOpen.redirect?.other : null,
      });
      setIsClosing(false);
    }, 300);
  };

  const renderModal = () => {
    switch (isOpen.text) {
      case "task":
        return (
          <ModalTask
            handleClose={handleClose}
            setIsOpen={setIsOpen}
            prevTask={isOpen.other as TaskType}
          />
        );
      case "taskKanban":
        return <ModalTaskKanban setIsOpen={setIsOpen} />;
      case "habit":
        return (
          <ModalHabit
            setIsOpen={setIsOpen}
            prevHabit={isOpen.other as HabitsType}
          />
        );
      case "event":
        return (
          <ModalEvent
            handleClose={handleClose}
            setIsOpen={setIsOpen}
            events={isOpen.other as EventType}
          />
        );
      case "contact":
        return <ModalContact setIsOpen={setIsOpen} profile={profile} />;
      case "pomodoroSettings":
        return (
          <ModalPomodoroSettings status={isOpen.other as PomodoroStatusType} />
        );
      case "delete-account":
        return <ModalDeleteAccount />;
      case "show-more":
        return <ModalShowMore list={isOpen.other} />;
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
