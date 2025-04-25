import Button from "@/components/Reusable/Button";
import { Dispatch, SetStateAction } from "react";

export default function RenderActionButton({
  type,
  isLoading,
}: {
  type: string;
  isLoading: boolean;
}) {
  if (type === "login")
    return (
      <Button
        size="large"
        type="submit"
        button="primary"
        state={isLoading ? "disabled" : "enabled"}
      >
        Iniciar Sesión
      </Button>
    );
  else
    return (
      <Button
        size="large"
        type="submit"
        button="primary"
        state={isLoading ? "disabled" : "enabled"}
      >
        Registrarse
      </Button>
    );
}
