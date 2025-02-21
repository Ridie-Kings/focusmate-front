import { useCallback, useEffect, useMemo, useState } from "react";
import MenuPomodoroButtons from "../../General/MenuPomodoroButtons";
import BarTimer from "../../General/BarTimer";
import { Ellipsis, Pause, Play, StepForward } from "lucide-react";

interface Time {
  min: number;
  seg: number;
  hours: number;
}

export default function TimerContainer() {
  const [menu, setMenu] = useState("Concentracion");
  const [isPlaying, setIsPlaying] = useState(false);

  const menuTimes = useMemo(
    () => ({
      Concentracion: { hours: 0, min: 25, seg: 0 },
      "Descanso Corto": { hours: 0, min: 5, seg: 0 },
      "Descanso Largo": { hours: 0, min: 15, seg: 0 },
    }),
    []
  );

  const [time, setTime] = useState<Time>(menuTimes["Concentracion"]);

  useEffect(() => {
    setTime(menuTimes[menu] || menuTimes["Concentracion"]);
  }, [menu, menuTimes]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => updateTime(-1), 1000);
    return () => clearInterval(interval);
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

  const handleMenuChange = useCallback((label: string) => {
    setMenu(label);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setTime(menuTimes[menu]);
  }, [menu, menuTimes]);

  const handleClick = useCallback(
    (id: string) => {
      if (id === "togglePlay") handleTogglePlay();
      if (id === "reset") handleReset();
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
          className="w-full flex items-center justify-center bg-white-100 rounded-lg px-7 py-20"
        >
          <span key={digit} className=" animate-opacStart">
            {digit}
          </span>
        </span>
      ));

  return (
    <div className="w-4/6 flex flex-col gap-3">
      <MenuPomodoroButtons handleMenuChange={handleMenuChange} menu={menu} />
      <div className="flex place-content-between gap-5 text-6xl relative items-center">
        <button
          onClick={() => updateTime(-1)}
          className="w-12 text-white-100 cursor-pointer absolute -left-18"
          disabled={time.hours === 0 && time.min === 0 && time.seg === 0}
        >
          -
        </button>
        <p className="flex text-[15rem] gap-4 cursor-default w-full font-bold">
          {time.hours > 0 && renderDigits(time.hours)}
          {renderDigits(time.min)}
          {renderDigits(time.seg)}
        </p>
        <button
          onClick={() => updateTime(1)}
          className="w-12 text-white-100 cursor-pointer absolute -right-18"
        >
          +
        </button>
      </div>
      <BarTimer dotColor="#202020" />
      <ul className="flex items-center justify-center gap-16 w-full text-white-100">
        {[
          {
            id: "toggleCountdown",
            icon: <Ellipsis size={40} />,
          },
          {
            id: "togglePlay",
            icon: isPlaying ? (
              <Pause size={40} fill="white" />
            ) : (
              <Play size={40} fill="white" />
            ),
          },
          {
            id: "reset",
            icon: <StepForward size={30} fill="white" />,
          },
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
