import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import { useModalStore } from "@/stores/modalStore";
import { useTranslations } from "next-intl";

type AddCardProps = {
  column: StatusType;
  setCards: Dispatch<SetStateAction<TaskType[]>>;
};

const AddCard = ({ column, setCards }: AddCardProps) => {
  const { setIsOpen } = useModalStore((state) => state.actions);
  const t = useTranslations("Common.buttons");

  return (
    <button
      onClick={() =>
        setIsOpen({ text: "taskKanban", other: { column, setTasks: setCards } })
      }
      className="bg-white flex w-[95%] items-center gap-1.5 px-3 py-1.5 justify-center border border-primary-500 rounded-lg hover:bg-secondary-200 transition-all duration-300 text-primary-500 cursor-pointer"
    >
      <span>{t("newTask")}</span>
      <Plus />
    </button>
  );
};

export default AddCard;
