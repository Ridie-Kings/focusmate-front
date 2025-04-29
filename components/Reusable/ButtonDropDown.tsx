import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function ButtonDropDown({
  children,
  items,
}: {
  children: React.ReactNode;
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
    <div className="relative inline-block text-left z-20" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 cursor-pointer px-4 py-1 text-primary-500 border-2 border-primary-500 rounded-lg"
        onClick={toggleDropdown}
      >
        <p className="px-4">{children}</p>
        <ChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white drop-shadow-lg p-1 text-primary-500">
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
