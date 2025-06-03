import { Brain, Coffee } from "lucide-react";
import { ReactNode } from "react";

export type chipsIconType = "focus" | "break" | "longBreak";

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
      className={`flex items-center border border-primary-500 justify-center rounded-lg cursor-pointer p-2 flex-1 gap-1  transition-all duration-300 ${className} ${
        status === "pressed"
          ? "bg-primary-500 text-white"
          : status === "enabled"
          ? " text-primary-500 hover:text-white hover:bg-primary-500-hover"
          : status === "hovered"
          ? "text-primary-500 border-2 border-primary-500"
          : status === "disabled" && "bg-accent text-white"
      }`}
    >
      {children}
      {icon === "focus" ? <Brain /> : icon === "break" && <Coffee />}
    </button>
  );
}
