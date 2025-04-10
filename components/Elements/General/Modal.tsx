import { Dispatch, SetStateAction } from "react";
import ModalTask from "./Modal/ModalTask";
import ModalHabit from "./Modal/ModalHabit";
import ModalEvent from "./Modal/ModalEvent";

export default function Modal({
  isOpen,
  setIsOpen,
  setItem,
}: {
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: Dispatch<SetStateAction<any>>;
}) {
  const renderModal = () => {
    switch (isOpen) {
      case "task":
        return <ModalTask setIsOpen={setIsOpen} setItem={setItem} />;
      case "habit":
        return <ModalHabit setIsOpen={setIsOpen} setItem={setItem} />;
      case "event":
        return <ModalEvent setIsOpen={setIsOpen} setItem={setItem} />;
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
