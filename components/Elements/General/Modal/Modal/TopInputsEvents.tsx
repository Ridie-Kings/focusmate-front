import { Dispatch, SetStateAction } from "react";
import ModalColorPicker from "../ModalColorPicker/ModalColorPicker";
import { tempEventType } from "@/interfaces/Modal/ModalType";
import { useTranslations } from "next-intl";

export default function TopInputs({
  error,
  event,
  setEvent,
  setError,
}: {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  event: tempEventType;
  setEvent: Dispatch<SetStateAction<tempEventType>>;
}) {
  const t = useTranslations("Modal.event");


  return (
    <div className="flex w-full place-content-between">
      <input
        type="text"
        placeholder={t("title")}
        defaultValue={event.title}
        className={`text-2xl outline-none flex-1 ${
          error && !event.title ? "border-red-500 border-b-2" : "text-gray-500"
        }`}
        onChange={(e) => {
          setEvent((prev) => ({ ...prev, title: e.target.value }));
          if (error) setError(null);
        }}
      />
      <ModalColorPicker
        defaultValue={event.color}
        onChange={(e) =>
          setEvent((prev) => ({ ...prev, color: e.target.value }))
        }
      />
    </div>
  );
}
