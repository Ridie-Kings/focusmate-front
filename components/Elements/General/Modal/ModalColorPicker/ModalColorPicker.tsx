import { useEffect, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import AgendaUtils from "@/lib/AgendaUtils";

export default function ModalColorPicker({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (e: { target: { value: string } }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(defaultValue);
  const { isLightColor } = AgendaUtils();

  useEffect(() => {
    setSelectedColor(defaultValue);
  }, [defaultValue]);

  const modalRef = useClickOutside<HTMLDivElement>(() => {
    if (open) setOpen(false);
  });

  const colors = [
    { hex: "#e9d2ee", name: "Lavender" },
    { hex: "#c0abc1", name: "Mauve" },
    { hex: "#a1cdb3", name: "Sage" },
    { hex: "#aaa3ff", name: "Periwinkle" },
    { hex: "#78c6a3", name: "Mint" },
    { hex: "#7688bf", name: "Cornflower" },
    { hex: "#56ab91", name: "Jade" },
    { hex: "#248277", name: "Teal" },
  ];

  const handleColorSelect = (color: string, close: boolean): void => {
    setSelectedColor(color);
    onChange({ target: { value: color } });
    if (close) {
      setOpen(false);
    }
  };

  const textColor = isLightColor(selectedColor) ? "text-black" : "text-white";

  return (
    <div className="relative flex items-center" ref={modalRef}>
      <button
        className="flex items-center space-x-2 rounded-md cursor-pointer gap-2"
        onClick={() => setOpen(!open)}
        aria-label="Open color picker"
        aria-expanded={open}
      >
        <span
          className={`rounded-lg px-2 ${textColor}`}
          onClick={() => setOpen(!open)}
          style={{
            backgroundColor: selectedColor !== "" ? selectedColor : "#000000",
          }}
        >
          Color
        </span>
      </button>

      {open && (
        <div
          className="absolute top-7 left-0 bg-white rounded-lg shadow-lg p-3 z-10 w-20"
          role="dialog"
          aria-label="Color picker"
        >
          <div className="grid grid-cols-2 gap-2">
            {colors.map((color) => (
              <button
                key={color.hex}
                className={`size-6 rounded-full flex items-center justify-center cursor-pointer`}
                style={{ backgroundColor: color.hex }}
                onClick={() => {
                  handleColorSelect(color.hex, true);
                }}
                aria-label={color.name}
                title={color.name}
              >
                {selectedColor === color.hex && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6 text-white drop-shadow-md"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                e.preventDefault();
                handleColorSelect(e.target.value, false);
              }}
              className="col-span-2 w-full h-8 rounded-md cursor-pointer"
              aria-label="Custom color input"
            />
          </div>
        </div>
      )}
    </div>
  );
}
