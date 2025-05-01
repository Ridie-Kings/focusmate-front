import { getHours, getMinutes } from "date-fns";
import { useEffect, useRef } from "react";

interface TimeDropdownProps {
  defaultValue: Date | undefined;
  onChange: (event: {
    target: { value: { hours: number; min: number } };
  }) => void;
}

const getPosition = (date: Date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return hours * 4 * 40 + minutes * (40 / 15);
};

export default function TimeDropdown({
  onChange,
  defaultValue,
}: TimeDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeOptions.push({ hours: hour, min: minute });
    }
  }

  useEffect(() => {
    dropdownRef.current?.scrollTo({
      top: getPosition(defaultValue ?? new Date()),
      left: 0,
      behavior: "smooth",
    });
  }, [defaultValue]);

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
      className="absolute bg-white rounded drop-shadow-lg top-2 h-70 overflow-auto w-40 z-10"
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
