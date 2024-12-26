"use client";
import { CirclePlay, Ellipsis, StepForward } from "lucide-react";
import { useState } from "react";

const item = [
  {
    id: 1,
    icon: <Ellipsis />,
  },
  {
    id: 2,
    icon: <CirclePlay />,
  },
  {
    id: 3,
    icon: <StepForward />,
  },
];

export default function Timer() {
  const [min, setMin] = useState(25);
  const [seg, setSeg] = useState(0);
  const [isCountdown, setIsCountdown] = useState(false);

  const handleAddTime = () => {
    setIsCountdown(false);
    if (seg === 60 && min === 60) return;
    if (seg >= 59) {
      setSeg(0);
      setMin(min + 1);
    } else {
      setSeg((prev) => prev + 1);
    }
  };
  const handleRemoveTime = () => {
    setIsCountdown(false);
    if (seg === 0) {
      setSeg(59);
      setMin(min - 1);
    } else {
      setSeg((prev) => prev - 1);
    }
  };
  return (
    <>
      <div className="flex gap-5 text-6xl">
        <button onClick={handleRemoveTime}>-</button>
        <p>
          {min < 10 ? "0" + min : min}:{seg < 10 ? "0" + seg : seg}
        </p>
        <button onClick={handleAddTime}>+</button>
      </div>
      <ul className="flex items-center gap-5">
        {item.map((item) => (
          <li key={item.id}>
            <button
              disabled={isCountdown}
              style={{
                padding:
                  item.id === 0 || item.id === 2 ? "20px 35px" : "15px 15px",
              }}
              className="border-2 rounded-lg"
            >
              {item.icon}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
