import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface InputModalProps {
  type: "text" | "select";
  placeholder: string;
  icon: ReactNode;
  option?: ReactNode;
  onChange?: (e: { target: { value: string } }) => void;
  propagand?: boolean;
  defaultValue?: string;
  className?: string;
}

export default function InputModal({
  type,
  placeholder,
  icon,
  option,
  onChange,
  className,
  propagand = true,
  defaultValue,
}: InputModalProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const modalRef = useClickOutside<HTMLDivElement>(() => {
    if (menuOpen) setMenuOpen(false);
  });

  const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (type === "select" && !propagand) e.stopPropagation();
    if (
      document.getElementById("save") === e.target ||
      document.getElementById("close") === e.target
    )
      setMenuOpen(false);
  };

  switch (type) {
    case "text":
      return (
        <div
          className={`flex gap-2 border-b border-neutral-200 pb-2 w-full ${className}`}
        >
          <span className="p-2">{icon}</span>
          <input
            type="text"
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="text-primary outline-none w-full"
            onChange={onChange}
          />
        </div>
      );
    case "select":
      return (
        <div
          className={`flex gap-2 border-b border-neutral-200 items-center pb-4 w-full ${className}`}
        >
          {icon !== "" && <span className="px-2">{icon}</span>}
          <div
            ref={modalRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col relative cursor-pointer w-full"
          >
            <div className="flex place-content-between w-full -z-10">
              {placeholder}
              <ChevronDown
                className={`transition-all duration-300 ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {menuOpen && (
              <div onClick={handleOptionClick} className="relative">
                {option}
              </div>
            )}
          </div>
        </div>
      );
  }
}
