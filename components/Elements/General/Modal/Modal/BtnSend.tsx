import Button from "@/components/Reusable/Button";
import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

export default function BtnSend({
  setIsOpen,
  handleClick,
  isLoading,
  text = "Guardar",
  loadingText = "Guardando...",
}: {
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => void;
  isLoading: boolean;
  text?: string;
  loadingText?: string;
}) {
  const t = useTranslations("Common");
  return (
    <div className="flex py-2 gap-2.5">
      <Button
        size="large"
        button="secondary"
        type="button"
        onClick={() => setIsOpen({ text: "" })}
        className="w-full"
      >
        {t("cancel")}
      </Button>
      <Button
        size="large"
        onClick={handleClick}
        button="primary"
        type="button"
        id="save"
        className="w-full"
      >
        {isLoading ? loadingText : text}
      </Button>
    </div>
  );
}
