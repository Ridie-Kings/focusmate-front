import { Dispatch, SetStateAction } from "react";

import ModalTask from "./Modal/ModalTask";
import ModalHabit from "./Modal/ModalHabit";
import ModalEvent from "./Modal/ModalEvent";
import ModalContact from "./Modal/ModalContact";

import { X } from "lucide-react";
import { TaskType } from "@/interfaces/Task/TaskType";
import { HabitsType } from "@/interfaces/Habits/HabitsType";

export default function Modal({
  isOpen,
  setIsOpen,
  setItem,
}: {
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: (data: { type: string; item: unknown }) => void;
}) {
  const renderModal = () => {
    switch (isOpen) {
      case "task":
        return <ModalTask setIsOpen={setIsOpen} setItem={setItem} />;
      case "habit":
        return <ModalHabit setIsOpen={setIsOpen} setItem={setItem} />;
      case "event":
        return <ModalEvent />;
      case "contact":
        return <ModalContact setIsOpen={setIsOpen} setItem={setItem} />;
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
