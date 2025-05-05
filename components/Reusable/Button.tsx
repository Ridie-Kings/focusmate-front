import { Brain, CircleGauge, Coffee, Plus } from "lucide-react";
import { ReactNode } from "react";
import { chipsIconType } from "./Chips";

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
  icon?: chipsIconType;
  state?: "enabled" | "pressed" | "disabled" | "disabled-pressed";
  size: "compact" | "large";
}) {
  const commonClasses = `flex items-center justify-center gap-2 w-full ${
    size === "large" ? "rounded-2xl" : "rounded-lg"
  } leading-6 transition-colors duration-300 ease-in-out ${
    state === "disabled" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;

  switch (button) {
    case "primary":
      return (
        <button
          onClick={state === "disabled" ? undefined : onClick}
          type={type}
          disabled={state === "disabled"}
          className={`${commonClasses}
            ${
              state === "pressed"
                ? "text-primary-500"
                : state === "disabled"
                ? "text-white bg-primary-300 border-primary-300"
                : "text-white bg-primary-500"
            }
            ${size === "large" ? "p-4 text-xl" : "px-6 py-2"}
           border border-primary-500 ${
             state === "disabled" ? "" : "hover:text-white hover:bg-primary-700"
           }`}
        >
          {children}
        </button>
      );
    case "secondary":
      return (
        <button
          onClick={state === "disabled" ? undefined : onClick}
          type={type}
          disabled={state === "disabled"}
          className={`${commonClasses} ${
            size === "large" ? "p-4" : "px-6 py-2"
          } ${
            state === "disabled"
              ? "bg-secondary-300"
              : "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700"
          } ${size === "large" ? "text-xl" : ""} text-white`}
        >
          {children}
        </button>
      );
    case "tertiary":
      return (
        <button
          onClick={state === "disabled" ? undefined : onClick}
          type={type}
          disabled={state === "disabled"}
          className={`${commonClasses} px-4 py-2 ${
            state === "disabled"
              ? "bg-primary-300"
              : "bg-primary-500 hover:bg-primary-400 active:bg-primary-500"
          } relative group text-white`}
        >
          {children}
          <Plus
            className={`absolute right-4 ${
              state === "disabled"
                ? "opacity-0"
                : "group-hover:opacity-100 opacity-0 transition-all duration-300"
            }`}
          />
        </button>
      );
    case "pomodoro":
      return (
        <button
          onClick={state === "disabled" ? undefined : onClick}
          type="button"
          disabled={state === "disabled" || state === "disabled-pressed"}
          className={`flex items-center border ${
            state === "disabled"
              ? "border-primary-300 cursor-not-allowed bg-gray-200"
              : state === "disabled-pressed"
              ? "border-primary-500 cursor-not-allowed bg-primary-200"
              : state === "pressed"
              ? "bg-primary-500 text-white border-primary-500 cursor-pointer"
              : "border-primary-500 hover:bg-primary-500 hover:text-white active:bg-primary-700 cursor-pointer"
          } justify-center rounded-lg p-2 flex-1 gap-1 transition-all duration-300`}
        >
          {children}
          {icon === "concentracion" ? (
            <Brain />
          ) : icon === "D/Corto" ? (
            <Coffee />
          ) : (
            icon === "chrono" && <CircleGauge />
          )}
        </button>
      );
    default:
      return null;
  }
}
