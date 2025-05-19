import { Plus } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { ModalContext } from "@/components/Provider/ModalProvider";

type AddCardProps = {
  column: StatusType;
  setCards: Dispatch<SetStateAction<TaskType[]>>;
};

const AddCard = ({ column, setCards }: AddCardProps) => {
  const { setIsOpen } = useContext(ModalContext);
  return (
    <button
      onClick={() =>
        setIsOpen({ text: "taskKanban", other: { column, setTasks: setCards } })
      }
      className="sticky bottom-0 bg-white flex w-[95%] items-center gap-1.5 px-3 py-1.5 justify-center border border-primary-500 rounded-lg hover:bg-secondary-200 transition-all duration-300 text-primary-500 cursor-pointer"
    >
      <span>Nueva Tarea</span>
      <Plus />
    </button>
  );
};

export default AddCard;
