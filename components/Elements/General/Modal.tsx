import { Dispatch, SetStateAction } from "react";
import ModalTask from "./Modal/ModalTask";
import ModalHabit from "./Modal/ModalHabit";
import ModalEvent from "./Modal/ModalEvent";
import { TaskType } from "@/interfaces/Task/TaskType";

export default function Modal({
  isOpen,
  setIsOpen,
  setItem,
}: {
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: (item: TaskType) => void;
}) {
  const renderModal = () => {
    switch (isOpen) {
      case "task":
        return <ModalTask setIsOpen={setIsOpen} setItem={setItem} />;
      case "habit":
        return <ModalHabit />;
      case "event":
        return <ModalEvent />;
      default:
        return "";
    }
  };
  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-50">
      {renderModal()}
    </div>
  );
}
