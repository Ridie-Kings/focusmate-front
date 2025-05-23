import Link from "next/link";
import { ReactNode } from "react";

export default function Button({
  button,
  type,
  children,
  onClick,
  size,
  state = "enabled",
  className,
  href,
}: {
  button: "primary" | "secondary" | "tertiary" | "pomodoro";
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => void;
  state?: "enabled" | "pressed" | "disabled" | "disabled-pressed";
  size: "compact" | "large";
  className?: string;
  href?: string;
}) {
  const commonClasses = `flex items-center justify-center gap-2 ${className} ${
    size === "large" ? "rounded-2xl" : "rounded-lg"
  } leading-6 transition-colors duration-300 ease-in-out ${
    state === "disabled" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;

  const renderContent = (elementClasses: string) => {
    const props = {
      onClick: state === "disabled" ? undefined : onClick,
      className: elementClasses,
    };

    if (href && state !== "disabled") {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <button type={type} disabled={state === "disabled"} {...props}>
        {children}
      </button>
    );
  };

  switch (button) {
    case "primary":
      return renderContent(
        `${commonClasses}
            ${
              state === "pressed"
                ? "text-primary-500"
                : state === "disabled"
                ? "text-white bg-primary-300 border-primary-300"
                : "text-white bg-primary-500"
            }
            ${size === "large" ? "p-4 text-xl" : "px-6 py-2"}
           border border-primary-500 cursor-pointer ${
             state === "disabled" ? "" : "hover:text-white hover:bg-primary-700"
           }`
      );
    case "secondary":
      return renderContent(
        `${commonClasses} ${size === "large" ? "p-4" : "px-6 py-2"} ${
          state === "disabled"
            ? "bg-secondary-300"
            : "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700"
        } ${size === "large" ? "text-xl" : ""} text-white cursor-pointer`
      );
    case "tertiary":
      return renderContent(
        `${commonClasses} px-4 py-2 ${
          state === "disabled"
            ? "bg-primary-300"
            : "bg-primary-500 hover:bg-primary-400 active:bg-primary-500"
        } relative group text-white cursor-pointer`
      );
    case "pomodoro":
      return renderContent(
        `${
          state === "disabled"
            ? "border-primary-300 cursor-not-allowed bg-gray-200"
            : state === "disabled-pressed"
            ? "border-primary-500 cursor-not-allowed bg-primary-200"
            : state === "pressed"
            ? "border-[1.5px] hover:bg-primary-400 hover:text-white border-primary-500 cursor-pointer"
            : "border border-primary-500 opacity-50 text-quaternary-700 hover:bg-primary-500 hover:text-white active:bg-primary-700 cursor-pointer"
        }
              flex items-center justify-center rounded-full px-2.5 py-1 transition-all duration-300 cursor-pointer text-sm`
      );
    default:
      return null;
  }
}
