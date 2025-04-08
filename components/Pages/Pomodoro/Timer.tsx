"use client";
import { Minus, Plus } from "lucide-react";
import MenuPomodoroButtons from "../Dashboard/Pomodoro/Timer/MenuPomodoroButtons";
import BarTimer from "../Dashboard/Pomodoro/Timer/BarTimer";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Commands from "../../Elements/General/PomodoroComponent/Commands";
import { TimerContext } from "@/components/Provider/TimerProvider";

export default function Timer() {
  const [menu, setMenu] = useState<string>("concentracion");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { setTime, time } = useContext(TimerContext);

  const menuTimes = useMemo(
    () => ({
      concentracion: { hours: 0, min: 25, seg: 0 },
      "D/Corto": { hours: 0, min: 5, seg: 0 },
      "D/Largo": { hours: 0, min: 15, seg: 0 },
    }),
    []
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((prev) => {
          const totalSeconds = prev.hours * 3600 + prev.min * 60 + prev.seg - 1;
          if (totalSeconds < 0) {
            setIsPlaying(false);
            return prev;
          }
          return {
            hours: Math.floor(totalSeconds / 3600),
            min: Math.floor((totalSeconds % 3600) / 60),
            seg: totalSeconds % 60,
          };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

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

  // const handleMenuChange = useCallback((label: string) => {
  //   setMenu(label);
  // }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setTime(menuTimes[menu as keyof typeof menuTimes]);
  }, [menu, menuTimes]);

  const handleClick = useCallback(
    (id: string) => {
      switch (id) {
        case "togglePlay":
          handleTogglePlay();
          break;
        case "reset":
          handleReset();
          break;
      }
    },
    [handleTogglePlay, handleReset]
  );

  const renderDigits = (num: number) =>
    String(num)
      .padStart(2, "0")
      .split("")
      .map((digit, index) => (
        <span
          key={index}
          className="w-[200px] flex overflow-hidden items-center justify-center bg-accent rounded-lg"
        >
          <span key={digit} className="animate-opacStart">
            {digit}
          </span>
        </span>
      ));

  return (
    <div className="w-1/2 max-h-[95vh] overflow-hidden flex-1 flex flex-col place-content-between items-center border border-accent p-4 gap-6 rounded-2xl">
      <MenuPomodoroButtons setMenu={setMenu} setTime={setTime} menu={menu} />
      <div className="flex place-content-between gap-5 text-6xl relative items-center">
        <Minus
          onClick={() => !isPlaying && updateTime(-60)}
          className="text-primary-500"
          size={48}
          style={{
            cursor: isPlaying ? "not-allowed" : "pointer",
            color: isPlaying ? "gray" : "#014e44",
          }}
        />
        <p className="flex flex-wrap justify-center text-primary-500 text-[17.5rem] flex-1 font-semibold gap-4 cursor-default">
          {time.hours > 0 && renderDigits(time.hours)}
          {renderDigits(time.min)}
          {renderDigits(time.seg)}
        </p>
        <Plus
          onClick={() => !isPlaying && updateTime(60)}
          className="text-primary-500"
          size={48}
          style={{
            cursor: isPlaying ? "not-allowed" : "pointer",
            color: isPlaying ? "gray" : "#014e44",
          }}
        />
      </div>
      <BarTimer />
      <Commands handleClick={handleClick} isPlay={isPlaying} />
    </div>
  );
}
