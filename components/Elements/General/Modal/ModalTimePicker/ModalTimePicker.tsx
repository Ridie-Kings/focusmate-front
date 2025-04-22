import { useRef } from "react";

interface TimeDropdownProps {
  onChange: (event: {
    target: { value: { hours: number; min: number } };
  }) => void;
}

export default function TimeDropdown({ onChange }: TimeDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeOptions.push({ hours: hour, min: minute });
    }
  }

  const handleSelectTime = (time: { hours: number; min: number }) => {
    onChange({
      target: {
        value: time,
      },
    });
  };

  const formatTime = (hours: number, min: number) => {
    return `${String(hours).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  };

  return (
    <div
      className="absolute bg-white rounded drop-shadow-lg top-2 h-70 overflow-auto w-40"
      ref={dropdownRef}
    >
      {timeOptions.map((time, index) => (
        <div
          key={index}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => handleSelectTime(time)}
        >
          {formatTime(time.hours, time.min)} h
        </div>
      ))}
    </div>
  );
}
