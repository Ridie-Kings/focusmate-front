"use client";
import { Eye } from "lucide-react";
import { useState, useContext, useEffect, Dispatch } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import Time from "./Timer/Time";
import Commands from "./Timer/Commands";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import BarTimer from "@/components/Pages/Dashboard/Pomodoro/Timer/BarTimer";

interface TimerProps {
  time: TimeType;
  setTime: Dispatch<React.SetStateAction<TimeType>>;
  menu: string;
}

export default function Timer({ menu }: TimerProps) {
  const {
    time,
    isPlay,
    togglePlay,
    resetTimer,
    updateTimeManually,
    setIsOpen,
    initialTime,
  } = useContext(TimerContext);

  const [hiddenTime, setHiddenTime] = useState(false);
  const [choseUpdate, setChoseUpdate] = useState("");

  useEffect(() => {
    if (isPlay) {
      togglePlay();
    }
  }, [menu]);

  const handleClick = (action: string) => {
    switch (action) {
      case "openFullScreen":
        setIsOpen(true);
        break;
      case "togglePlay":
        setChoseUpdate("");
        togglePlay();
        break;
      case "reset":
        resetTimer();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <Eye
        size={40}
        className="cursor-pointer text-primary-500"
        onClick={() => setHiddenTime(!hiddenTime)}
      />
      <Time
        hiddenTime={hiddenTime}
        time={time}
        updateTime={updateTimeManually}
        isPlay={isPlay}
        setChoseUpdate={setChoseUpdate}
        choseUpdate={choseUpdate}
      />
      <BarTimer time={time} initialTime={initialTime} />
      <Commands handleClick={handleClick} isPlay={isPlay} />
    </div>
  );
}
