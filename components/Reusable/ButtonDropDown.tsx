"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function ButtonDropDown({
  children,
  items,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  items: { label: string; onClick: () => void }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block z-20" ref={dropdownRef}>
      <button
        type="button"
        className={`inline-flex items-center justify-center cursor-pointer px-4 py-1 text-primary-500 rounded-lg ${className}`}
        onClick={toggleDropdown}
      >
        <p className="px-4 capitalize">{children}</p>
        <ChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute min-w-3/4 right-1/2 translate-x-1/2 text-lg rounded-md bg-white drop-shadow-lg p-1 text-primary-500">
          {items.map((item, index) => (
            <button
              key={index}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer hover:text-gray-900 rounded"
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
