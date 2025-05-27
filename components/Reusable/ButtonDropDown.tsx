"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function ButtonDropDown({
  children,
  items,
  className,
  onClick,
  position = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  items: { label: string; onClick: () => void }[];
  onClick?: () => void;
  position?:
    | "bottom"
    | "top"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2 right-1/2 translate-x-1/2";
      case "top-left":
        return "bottom-full mb-2 left-0";
      case "top-right":
        return "bottom-full mb-2 right-0";
      case "bottom-left":
        return "top-full mt-2 left-0";
      case "bottom-right":
        return "top-full mt-2 right-0";
      case "bottom":
      default:
        return "top-full mt-2 right-1/2 translate-x-1/2";
    }
  };

  return (
    <div
      className="relative inline-block z-20"
      ref={dropdownRef}
      onClick={onClick}
    >
      <button
        type="button"
        className={`${className} inline-flex items-center justify-center cursor-pointer text-secondary-700 rounded-lg`}
        onClick={toggleDropdown}
      >
        <p className="px-4 capitalize">{children}</p>
        <ChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute min-w-3/4 max-w-52 max-h-52 overflow-y-auto text-lg rounded-md bg-white drop-shadow-lg p-1 text-secondary-700 ${getPositionStyles()}`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer hover:text-gray-900 rounded truncate"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
