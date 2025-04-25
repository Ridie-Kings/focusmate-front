import Button from "@/components/Reusable/Button";
import { Dispatch, SetStateAction } from "react";

export default function BtnSend({
  setIsOpen,
  handleClick,
  isLoading,
}: {
  setIsOpen: Dispatch<SetStateAction<{ text: string; other?: any }>>;
  handleClick: () => void;
  isLoading: boolean;
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
        {isLoading ? "Guardando..." : "Guardar"}
      </Button>
    </div>
  );
}
