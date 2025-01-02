"use client";
import { Ellipsis, Eye, Pause, Play, StepForward } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";

interface TimerProps {
  menu: string;
}

interface Time {
  min: number;
  seg: number;
  hours: number;
}

const menuTimes: Record<string, Time> = {
  Concentracion: { hours: 0, min: 25, seg: 0 },
  "Descanso Corto": { hours: 0, min: 5, seg: 0 },
  "Descanso Largo": { hours: 0, min: 15, seg: 0 },
};

const actions = [
  { id: 1, icon: <Ellipsis size={30} />, action: "toggleCountdown" },
  { id: 2, icon: <Play size={30} fill="black" />, action: "togglePlay" },
  { id: 3, icon: <StepForward size={30} fill="black" />, action: "reset" },
];

export default function Timer({ menu }: TimerProps) {
  const [maxTime, setMaxTime] = useState<Time>({ hours: 0, min: 50, seg: 0 });
  const [time, setTime] = useState<Time>({ hours: 0, min: 50, seg: 0 });
  const [isCountdown, setIsCountdown] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const handleAddTime = useCallback(() => {
    setTime((prev) => {
      const nextSec = prev.seg + 1;
      const nextMin = prev.min + (nextSec === 60 ? 1 : 0);
      const nextHour = prev.hours + (nextMin === 60 ? 1 : 0);
      if (nextHour !== prev.hours) {
        return { hours: nextHour, min: 0, seg: 0 };
      }
      return { hours: nextHour, min: nextMin, seg: nextSec % 60 };
    });
  }, []);

  const handleRemoveTime = useCallback(() => {
    setTime((prev) => {
      const nextSec = prev.seg - 1;
      const nextMin = nextSec < 0 ? prev.min - 1 : prev.min;
      const nextHour =
        prev.min === 0 && prev.seg === 0
          ? prev.hours > 0
            ? prev.hours - 1
            : 0
          : prev.hours;
      if (nextHour !== prev.hours) {
        return { hours: nextHour, min: 59, seg: 59 };
      }
      return { hours: nextHour, min: nextMin, seg: (nextSec + 60) % 60 };
    });
  }, []);

  const handleClick = (id: number) => {
    switch (id) {
      case 1:
        setIsCountdown((prev) => !prev);
        break;
      case 2:
        setIsPlay((prev) => !prev);
        break;
      case 3:
        setIsCountdown(false);
        setIsPlay(false);
        setTime(maxTime);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const selectedTime = menuTimes[menu] || { hours: 0, min: 25, seg: 0 };
    setMaxTime(selectedTime);
    setTime(selectedTime);
  }, [menu]);

  useEffect(() => {
    if (!isPlay) return;
    const interval = setInterval(handleRemoveTime, 1000);
    return () => clearInterval(interval);
  }, [isPlay, handleRemoveTime]);

  return (
    <>
      <Eye size={25} className="cursor-pointer" />
      <div className="flex gap-5 text-6xl relative">
        {!isCountdown && (
          <button onClick={handleRemoveTime} className="w-10">
            -
          </button>
        )}
        <p>
          {time.hours != 0 && time.hours.toString().padStart(2, "0") + ":"}
          {time.min.toString().padStart(2, "0")}:
          {time.seg.toString().padStart(2, "0")}
        </p>
        {!isCountdown && (
          <button onClick={handleAddTime} className="w-10">
            +
          </button>
        )}
      </div>
      <div className="h-5 w-[90%] flex items-center">
        <div
          style={{
            width: `${(time.min * 100) / maxTime.min}%`,
          }}
          className="h-0.5 rounded-full bg-gray-100"
        />
      </div>
      <ul className="flex items-center gap-16">
        {actions.map((action) => (
          <li key={action.id}>
            <button onClick={() => handleClick(action.id)}>
              {action.id === 2 && isPlay ? (
                <Pause size={30} fill="black" />
              ) : (
                action.icon
              )}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
