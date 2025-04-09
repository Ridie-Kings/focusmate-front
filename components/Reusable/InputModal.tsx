import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

export default function InputModal({
  type,
  placeholder,
  icon,
  option,
}: {
  type: "text" | "select";
  placeholder: string;
  icon: ReactNode;
  option?: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  switch (type) {
    case "text":
      return (
        <div className="flex gap-2 border-b border-neutral-200 pb-2">
          <span className="p-2">{icon}</span>
          <input
            type="text"
            placeholder={placeholder}
            className="text-primary outline-none"
          />
        </div>
      );
    case "select":
      return (
        <div className="flex gap-2 border-b border-neutral-200 items-center pb-2">
          <span className="p-2">{icon}</span>
          <div
            className={`flex flex-col relative cursor-pointer ${
              menuOpen ? "overflow-hidden" : ""
            }`}
          >
            <div
              onClick={() => setMenuOpen(true)}
              className="flex place-content-between w-full "
            >
              {placeholder}
              <ChevronDown />
            </div>
            {option}
          </div>
        </div>
      );
  }
}
