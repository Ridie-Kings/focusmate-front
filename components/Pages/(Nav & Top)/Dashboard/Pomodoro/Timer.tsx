"use client";
import { Eye } from "lucide-react";
import { useState, useContext } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import Time from "./Timer/Time";
import Commands from "../../../../Elements/Pomodoro/Commands";
import BarTimer from "@/components/Elements/Pomodoro/BarTimer";

export default function Timer() {
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
