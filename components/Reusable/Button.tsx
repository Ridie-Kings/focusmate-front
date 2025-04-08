import { Brain, Coffee, Plus, Sofa } from "lucide-react";
import { ReactNode } from "react";

export default function Button({
  button,
  type,
  children,
  onClick,
  icon,
  state = "enabled",
}: {
  button: "primary" | "secondary" | "tertiary" | "pomodoro";
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  onClick?: () => void;
  icon?: "concentracion" | "D/Largo" | "D/Corto";
  state?: "enabled" | "pressed";
}) {
  const commonClasses =
    "cursor-pointer flex items-center justify-center gap-2 w-full rounded-2xl leading-6 transition-colors duration-300 ease-in-out text-white";

  switch (button) {
    case "primary":
      return (
        <button
          onClick={onClick}
          type={type}
          className={`${commonClasses} p-4 bg-primary-500 text-xl hover:bg-primary-500-hover active:bg-primary-500-pressed`}
        >
          {children}
        </button>
      );
    case "secondary":
      return (
        <button
          onClick={onClick}
          type={type}
          className={`${commonClasses} p-4 bg-secondary-700 text-xl hover:bg-secondary-700-hover active:bg-secondary-700-pressed`}
        >
          {children}
        </button>
      );
    case "tertiary":
      return (
        <button
          onClick={onClick}
          type={type}
          className={`${commonClasses} px-4 py-2 bg-primary-500 hover:bg-primary-500-hover active:bg-primary-500-pressed relative group`}
        >
          {children}
          <Plus className="absolute right-4 group-hover:opacity-100 opacity-0 transition-all duration-300" />
        </button>
      );
    case "pomodoro":
      return (
        <button
          onClick={onClick}
          type="button"
          className={`flex items-center border border-primary-500 hover:bg-primary-500 hover:text-white active:bg-primary-700 justify-center rounded-lg cursor-pointer p-2 flex-1 gap-1  transition-all duration-300 ${
            state === "pressed" ? "bg-primary-500 text-white" : ""
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
    default:
      return null;
  }
}
