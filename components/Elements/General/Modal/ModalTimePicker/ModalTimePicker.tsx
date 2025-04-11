import { useState, useEffect, useRef } from "react";

interface ModalTimePickerProps {
  onChange: (event: {
    target: { value: { hours: number; min: number } };
  }) => void;
}

export default function ModalTimePicker({ onChange }: ModalTimePickerProps) {
  const [time, setTime] = useState({ hours: 0, min: 0, seg: 0 });
  const [editHours, setEditHours] = useState(false);
  const [editMin, setEditMin] = useState(false);
  const [hoursValue, setHoursValue] = useState(String(0).padStart(2, "0"));
  const [minValue, setMinValue] = useState(String(0).padStart(2, "0"));
  const [choseUpdate, setChoseUpdate] = useState("");

  const hoursInputRef = useRef<HTMLInputElement | null>(null);
  const minInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editMin && minInputRef.current) {
      minInputRef.current.focus();
      minInputRef.current.select();
    }
  }, [editMin]);

  useEffect(() => {
    if (editHours && hoursInputRef.current) {
      hoursInputRef.current.focus();
      hoursInputRef.current.select();
    }
  }, [editHours]);

  useEffect(() => {
    setMinValue(String(time.min).padStart(2, "0"));
  }, [time.min]);

  useEffect(() => {
    setHoursValue(String(time.hours).padStart(2, "0"));
  }, [time.hours]);

  interface Time {
    hours: number;
    min: number;
    seg: number;
  }

  interface OnChangeEvent {
    target: {
      value: string;
    };
  }

  type UpdateUnit = "min" | "hours" | "seg";

  const updateTime = (delta: number, unit: UpdateUnit) => {
    const newTime: Time = { ...time };

    if (unit === "min") {
      newTime.min = Math.max(0, Math.min(59, newTime.min + delta));
    } else if (unit === "hours") {
      newTime.hours = Math.max(0, newTime.hours + delta);
    } else if (unit === "seg") {
      newTime.seg = Math.max(0, Math.min(59, newTime.seg + delta));
    }

    setTime(newTime);

    onChange({
      target: {
        value: {
          hours: newTime.hours,
          min: newTime.min,
        },
      },
    });
  };

  const handleMinChange = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;

    const newMin = parseInt(minValue) || 0;
    if (newMin >= 0 && newMin <= 59) {
      const delta = newMin - time.min;
      updateTime(delta, "min");
    } else {
      setMinValue(String(time.min).padStart(2, "0"));
    }
    setEditMin(false);
  };

  const handleHoursChange = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;

    const newHours = parseInt(hoursValue) || 0;
    if (newHours >= 0) {
      const delta = newHours - time.hours;
      updateTime(delta, "hours");
    } else {
      setHoursValue(String(time.hours).padStart(2, "0"));
    }
    setEditHours(false);
  };

  return (
    <div className="absolute -top-9 -left-3 w-32 drop-shadow-lg rounded-lg bg-background-primary flex flex-col p-4">
      <p
        className={`
            transition-all duration-200 text-xl font-medium
          `}
      >
        {editHours ? (
          <>
            <input
              ref={hoursInputRef}
              type="text"
              value={hoursValue}
              onChange={(e) => setHoursValue(e.target.value)}
              onKeyDown={handleHoursChange}
              onBlur={handleHoursChange}
              className="w-12 bg-transparent text-center outline-none border-b border-gray-300"
              maxLength={2}
            />
            <span>:</span>
          </>
        ) : (
          <span
            className="cursor-pointer hover:text-secondary-400 transition-colors duration-300"
            onClick={() => {
              setEditHours(true);
              setChoseUpdate("hours");
            }}
          >
            {String(time.hours).padStart(2, "0")}:
          </span>
        )}
        {editMin ? (
          <input
            ref={minInputRef}
            type="text"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            onKeyDown={handleMinChange}
            onBlur={handleMinChange}
            className="w-12 bg-transparent text-center outline-none border-b border-gray-300"
            maxLength={2}
          />
        ) : (
          <span
            className="cursor-pointer hover:text-secondary-400 transition-colors duration-300"
            onClick={() => {
              setEditMin(true);
              setChoseUpdate("min");
            }}
          >
            {String(time.min).padStart(2, "0")}
          </span>
        )}{" "}
        h
      </p>
    </div>
  );
}
