"use client";
import { Eye } from "lucide-react";
import { useState, useContext } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import Time from "./Timer/Time";
import Commands from "../../../../Elements/Pomodoro/Commands";
import BarTimer from "@/components/Elements/Pomodoro/BarTimer";
import { SocketIOContext } from "@/components/Provider/WebsocketProvider";

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

  const {
    status,
    startPomodoro,
    stopPomodoro,
    pausePomodoro,
    resumePomodoro,
  } = useContext(SocketIOContext);

  const [hiddenTime, setHiddenTime] = useState(false);
  const [choseUpdate, setChoseUpdate] = useState("");

  console.log("prevtoggle", status)

  const handleClick = (action: string) => {
    switch (action) {
      case "openFullScreen":
        setIsOpen(true);
        break;
      case "togglePlay":
        console.log("togglePlay", status);
        if (!status?.active) startPomodoro();
        else if (!status.isPaused) pausePomodoro();
        else if (status.isPaused) resumePomodoro();
        setChoseUpdate("");
        togglePlay();
        break;
      case "reset":
        if (status?.active) stopPomodoro();
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
