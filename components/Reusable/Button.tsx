import { Plus } from "lucide-react";
import { ReactNode } from "react";

export default function Button({
  button,
  breakpoint,
  type,
  children,
}: {
  button: "primary" | "secondary" | "tertiary";
  breakpoint?: string;
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
}) {
  const commonClasses =
    "cursor-pointer flex items-center justify-center gap-2 w-full rounded-2xl leading-6 transition-colors duration-300 ease-in-out text-white";

  switch (button) {
    case "primary":
      return (
        <button
          type={type}
          className={`${commonClasses} p-4 bg-primary-green text-xl hover:bg-primary-green-hover active:bg-primary-green-pressed`}
        >
          {children}
        </button>
      );
    case "secondary":
      return (
        <button
          type={type}
          className={`${commonClasses} p-4 bg-secondary-green text-xl hover:bg-secondary-green-hover active:bg-secondary-green-pressed`}
        >
          {children}
        </button>
      );
    case "tertiary":
      return (
        <button
          type={type}
          className={`${commonClasses} px-4 py-2 bg-primary-green hover:bg-primary-green-hover active:bg-primary-green-pressed relative group`}
        >
          {children}
          <Plus className="absolute right-4 group-hover:opacity-100 opacity-0 transition-all duration-300" />
        </button>
      );
    default:
      return null;
  }
}
