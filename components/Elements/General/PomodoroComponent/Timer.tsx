"use client";
import { Eye } from "lucide-react";
import { useEffect, useState, useCallback, useContext, Dispatch } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import BarTimer from "../BarTimer";
import Time from "./Time";
import Commands from "./Commands";

interface TimerProps {
  time: TimeType;
  setTime: Dispatch<React.SetStateAction<TimeType>>;
}

export type TimeType = {
  min: number;
  seg: number;
  hours: number;
};

export default function Timer({ time, setTime }: TimerProps) {
  const { setIsOpen } = useContext(TimerContext);

  const [hiddenTime, sethiddenTime] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const updateTime = useCallback((delta: number) => {
    setTime((prev) => {
      let totalSeconds = prev.hours * 3600 + prev.min * 60 + prev.seg + delta;
      totalSeconds = Math.max(0, totalSeconds);

      return {
        hours: Math.floor(totalSeconds / 3600),
        min: Math.floor((totalSeconds % 3600) / 60),
        seg: totalSeconds % 60,
      };
    });
  }, []);

  const handleClick = (action: string) => {
    switch (action) {
      case "openFullScreen":
        setIsOpen(true);
        break;
      case "togglePlay":
        setIsPlay((prev) => !prev);
        break;
      case "reset":
        setIsPlay(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isPlay) return;
    const interval = setInterval(() => updateTime(-1), 1000);
    return () => clearInterval(interval);
  }, [isPlay]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <Eye
        size={40}
        className="cursor-pointer text-primary-green"
        onClick={() => sethiddenTime(!hiddenTime)}
      />
      <Time hiddenTime={hiddenTime} time={time} updateTime={updateTime} />
      <BarTimer />
      <Commands handleClick={handleClick} isPlay={isPlay} />
    </div>
  );
}
