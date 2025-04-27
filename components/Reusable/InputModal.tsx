import { ChevronDown } from "lucide-react";
import { ReactNode, useRef, useState, useEffect } from "react";

interface InputModalProps {
  type: "text" | "select";
  placeholder: string;
  icon: ReactNode;
  option?: ReactNode;
  onChange?: (e: { target: { value: string } }) => void;
  propagand?: boolean;
  defaultValue?: string;
}

export default function InputModal({
  type,
  placeholder,
  icon,
  option,
  onChange,
  propagand = true,
  defaultValue,
}: InputModalProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }

      if (document.getElementById("guardar") === event.target)
        setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (type === "select" && !propagand) e.stopPropagation();
  };

  switch (type) {
    case "text":
      return (
        <div className="flex gap-2 border-b border-neutral-200 pb-2 w-full">
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
        <div className="flex gap-2 border-b border-neutral-200 items-center pb-4 w-full">
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
              <div
                ref={menuRef}
                onClick={handleOptionClick}
                className="relative"
              >
                {option}
              </div>
            )}
          </div>
        </div>
      );
  }
}
