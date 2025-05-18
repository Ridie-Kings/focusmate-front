import { TypeIsOpen } from "@/components/Provider/ModalProvider";
import Button from "@/components/Reusable/Button";
import { Dispatch, SetStateAction } from "react";

export default function BtnSend({
  setIsOpen,
  handleClick,
  isLoading,
  text = "Guardar",
  loadingText = "Guardando...",
}: {
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading: boolean;
  text?: string;
  loadingText?: string;
}) {
  return (
    <div className="flex py-2 gap-2.5">
      <Button
        size="large"
        button="secondary"
        type="button"
        onClick={() => setIsOpen({ text: "" })}
      >
        Cancelar
      </Button>
      <Button size="large" onClick={handleClick} button="primary" type="button">
        {isLoading ? loadingText : text}
      </Button>
    </div>
  );
}
