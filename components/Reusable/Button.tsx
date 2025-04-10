import { Brain, Coffee, Plus, Sofa } from "lucide-react";
import { ReactNode } from "react";

export default function Button({
  button,
  type,
  children,
  onClick,
  icon,
  size,
  state = "enabled",
}: {
  button: "primary" | "secondary" | "tertiary" | "pomodoro";
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  onClick?: () => void;
  icon?: "concentracion" | "D/Largo" | "D/Corto";
  state?: "enabled" | "pressed";
  size: "compact" | "large";
}) {
  const commonClasses = `cursor-pointer flex items-center justify-center gap-2 w-full ${
    size === "large" ? "rounded-2xl" : "rounded-lg"
  } leading-6 transition-colors duration-300 ease-in-out text-white`;

  switch (button) {
    case "primary":
      return (
        <button
          onClick={onClick}
          type={type}
          className={`${commonClasses} ${
            size === "large" ? "p-4" : "px-6 py-2"
          } bg-primary-500 ${
            size === "large" ? "text-xl" : ""
          } hover:bg-primary-700 active:bg-primary-500`}
        >
          {children}
        </button>
      );
    case "secondary":
      return (
        <button
          onClick={onClick}
          type={type}
          className={`${commonClasses} ${
            size === "large" ? "p-4" : "px-6 py-2"
          } bg-secondary-500 ${
            size === "large" ? "text-xl" : ""
          } hover:bg-secondary-600 active:bg-secondary-700`}
        >
          {children}
        </button>
      );
    case "tertiary":
      return (
        <button
          onClick={onClick}
          type={type}
          className={`${commonClasses} px-4 py-2 bg-primary-500 hover:bg-primary-400 active:bg-primary-500 relative group`}
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
