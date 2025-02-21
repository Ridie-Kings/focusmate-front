"use client";
import { Ellipsis, Eye, Pause, Play, StepForward } from "lucide-react";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { TimerFullScreenContext } from "@/components/Provider/TimerFullScreenProvider";
import BarTimer from "../BarTimer";

interface TimerProps {
  menu: string;
}

interface Time {
  min: number;
  seg: number;
  hours: number;
}

export default function Timer({ menu }: TimerProps) {
  const { setIsOpen } = useContext(TimerFullScreenContext);
  const menuTimes = useMemo<Record<string, Time>>(
    () => ({
      Concentracion: { hours: 0, min: 25, seg: 0 },
      "Descanso Corto": { hours: 0, min: 5, seg: 0 },
      "Descanso Largo": { hours: 0, min: 15, seg: 0 },
    }),
    []
  );

  const [maxTime, setMaxTime] = useState<Time>(menuTimes["Concentracion"]);
  const [time, setTime] = useState<Time>(menuTimes["Concentracion"]);
  const [isCountdown, setIsCountdown] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const updateTime = useCallback((delta: number) => {
    setTime((prev) => {
      let totalSeconds = prev.hours * 3600 + prev.min * 60 + prev.seg + delta;
      totalSeconds = Math.max(0, totalSeconds); // Évite les valeurs négatives

      return {
        hours: Math.floor(totalSeconds / 3600),
        min: Math.floor((totalSeconds % 3600) / 60),
        seg: totalSeconds % 60,
      };
    });
  }, []);

  const handleClick = (action: string) => {
    switch (action) {
      case "toggleCountdown":
        setIsCountdown((prev) => !prev);
        break;
      case "togglePlay":
        setIsPlay((prev) => !prev);
        break;
      case "reset":
        setIsPlay(false);
        setIsCountdown(false);
        setTime(maxTime);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const selectedTime = menuTimes[menu] || menuTimes["Concentracion"];
    setMaxTime(selectedTime);
    setTime(selectedTime);
  }, [menu, menuTimes]);

  useEffect(() => {
    if (!isPlay) return;
    const interval = setInterval(() => updateTime(-1), 1000);
    return () => clearInterval(interval);
  }, [isPlay, updateTime]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Eye
        size={25}
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <div className="flex gap-5 text-6xl relative">
        {!isCountdown && (
          <button
            onClick={() => updateTime(-1)}
            className="w-10"
            disabled={time.hours === 0 && time.min === 0 && time.seg === 0}
          >
            -
          </button>
        )}
        <p>
          {time.hours > 0 && `${String(time.hours).padStart(2, "0")}:`}
          {String(time.min).padStart(2, "0")}:
          {String(time.seg).padStart(2, "0")}
        </p>
        {!isCountdown && (
          <button onClick={() => updateTime(1)} className="w-10">
            +
          </button>
        )}
      </div>
      <BarTimer />
      <ul className="flex items-center gap-16">
        {[
          {
            id: "toggleCountdown",
            icon: <Ellipsis size={30} />,
          },
          {
            id: "togglePlay",
            icon: isPlay ? (
              <Pause size={30} fill="black" />
            ) : (
              <Play size={30} fill="black" />
            ),
          },
          { id: "reset", icon: <StepForward size={30} fill="black" /> },
        ].map(({ id, icon }) => (
          <li key={id}>
            <button onClick={() => handleClick(id)} className="cursor-pointer">
              {icon}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
