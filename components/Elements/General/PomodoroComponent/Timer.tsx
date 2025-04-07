"use client";
import { Eye } from "lucide-react";
import { useEffect, useState, useCallback, useContext, Dispatch } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import BarTimer from "../BarTimer";
import Time from "./Time";
import Commands from "./Commands";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";

interface TimerProps {
  time: TimeType;
  setTime: Dispatch<React.SetStateAction<TimeType>>;
  menu: string;
}

export default function Timer({ time, setTime, menu }: TimerProps) {
  const { setIsOpen } = useContext(TimerContext);

  const [hiddenTime, setHiddenTime] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [choseUpdate, setChoseUpdate] = useState<string>("");

  const updateTime = useCallback(
    (delta: number, updateType: string) => {
      setTime((prev) => {
        let totalSeconds = prev.hours * 3600 + prev.min * 60 + prev.seg;
        console.log(prev);

        if (updateType === "hours") {
          totalSeconds += delta * 3600;
        } else if (updateType === "min") {
          totalSeconds += delta * 60;
        } else if (updateType === "seg") {
          totalSeconds += delta;
        }

        totalSeconds = Math.max(0, totalSeconds);

        if (totalSeconds === 0 && isPlay) {
          setIsPlay(false);
        }

        return {
          hours: Math.floor(totalSeconds / 3600),
          min: Math.floor((totalSeconds % 3600) / 60),
          seg: totalSeconds % 60,
        };
      });
    },
    [isPlay]
  );

  const handleClick = (action: string) => {
    switch (action) {
      case "openFullScreen":
        setIsOpen(true);
        break;
      case "togglePlay":
        setChoseUpdate("");
        setIsPlay((prev) => !prev);
        break;
      case "reset":
        setIsPlay(false);
        setTime({ hours: 0, min: 0, seg: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setIsPlay(false);
  }, [menu]);

  useEffect(() => {
    if (!isPlay) return;

    const totalSeconds = time.hours * 3600 + time.min * 60 + time.seg;
    if (totalSeconds === 0) {
      setIsPlay(false);
      return;
    }

    const interval = setInterval(() => updateTime(-1, "seg"), 1000);
    return () => clearInterval(interval);
  }, [isPlay, time, updateTime]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <Eye
        size={40}
        className="cursor-pointer text-primary-green"
        onClick={() => setHiddenTime(!hiddenTime)}
      />
      <Time
        hiddenTime={hiddenTime}
        time={time}
        updateTime={updateTime}
        isPlay={isPlay}
        setChoseUpdate={setChoseUpdate}
        choseUpdate={choseUpdate}
      />
      <BarTimer />
      <Commands handleClick={handleClick} isPlay={isPlay} />
    </div>
  );
}
