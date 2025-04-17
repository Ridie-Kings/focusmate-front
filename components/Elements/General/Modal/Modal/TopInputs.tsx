import { Dispatch, SetStateAction } from "react";
import ModalColorPicker from "../ModalColorPicker/ModalColorPicker";
import { tempTaskType } from "@/interfaces/Modal/ModalType";

export default function TopInputs({
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
  return (
    <div className="flex w-full place-content-between">
      <input
        type="text"
        placeholder="Título"
        className={`text-2xl outline-none ${
          error && !task.title ? "border-red-500 border-b-2" : "text-gray-500"
        }`}
        onChange={(e) => {
          setTask((prev) => ({ ...prev, title: e.target.value }));
          if (error) setError(null);
        }}
      />
      <ModalColorPicker
        onChange={(e) =>
          setTask((prev) => ({ ...prev, color: e.target.value }))
        }
      />
    </div>
  );
}
