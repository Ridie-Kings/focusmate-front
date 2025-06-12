import { Dispatch, SetStateAction } from "react";
import ModalColorPicker from "../ModalColorPicker/ModalColorPicker";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { useTranslations } from "next-intl";

export default function TopInputsTasks({
  error,
  task,
  setTask,
  setError,
}: {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  task: tempTaskType;
  setTask: Dispatch<SetStateAction<tempTaskType>>;
}) {
  const t = useTranslations("Modal.task");

  return (
    <div className="flex w-full place-content-between">
      <input
        type="text"
        placeholder={t("title")}
        defaultValue={task.title}
        className={`text-2xl outline-none flex-1 ${
          error && !task.title ? "border-red-500 border-b-2" : "text-gray-500"
        }`}
        onChange={(e) => {
          setTask((prev) => ({ ...prev, title: e.target.value }));
          if (error) setError(null);
        }}
      />
      <ModalColorPicker
        defaultValue={task.color}
        onChange={(e) =>
          setTask((prev) => ({ ...prev, color: e.target.value }))
        }
      />
    </div>
  );
}
