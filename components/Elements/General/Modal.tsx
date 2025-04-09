import { Dispatch, SetStateAction } from "react";
import ModalTask from "./Modal/ModalTask";
import ModalHabit from "./Modal/ModalHabit";
import ModalEvent from "./Modal/ModalEvent";

export default function Modal({
  isOpen,
  setIsOpen,
}: {
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
}) {
  const renderModal = () => {
    switch (isOpen) {
      case "task":
        return <ModalTask setIsOpen={setIsOpen} />;
      case "habit":
        return <ModalHabit setIsOpen={setIsOpen} />;
      case "event":
        return <ModalEvent setIsOpen={setIsOpen} />;
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
