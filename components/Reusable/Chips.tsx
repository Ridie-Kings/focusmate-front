import { Brain, Coffee, Sofa } from "lucide-react";
import { ReactNode } from "react";

export type chipsIconType =
  | "concentracion"
  | "D/Corto"
  | "D/Largo"
  | "undefined";

export default function Chips({
  status,
  icon,
  children,
  onClick,
  className = "",
}: {
  status: "enabled" | "hovered" | "disabled" | "pressed";
  icon: chipsIconType;
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center border border-primary-green justify-center rounded-lg cursor-pointer p-2 flex-1 gap-1  transition-all duration-300 ${className} ${
        status === "pressed"
          ? "bg-primary-green text-white"
          : status === "enabled"
          ? " text-primary-green hover:text-white hover:bg-primary-green-hover"
          : status === "hovered"
          ? "text-primary-green border-2 border-primary-green"
          : status === "disabled" && "bg-accent text-white"
      }`}
    >
      {children}
      {icon === "concentracion" ? (
        <Brain />
      ) : icon === "D/Corto" ? (
        <Coffee />
      ) : (
        icon === "D/Largo" && <Sofa />
      )}
    </button>
  );
}
