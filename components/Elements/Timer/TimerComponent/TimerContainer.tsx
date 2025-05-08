// import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import TypeTimeButtons from "@/components/Elements/Pomodoro/TypeTimeButtons";
// import BarTimer from "@/components/Elements/Pomodoro/BarTimer";
// import { Minus, Plus } from "lucide-react";
// import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
// import Commands from "@/components/Elements/Pomodoro/Commands";
// import { chipsIconType } from "@/components/Reusable/Chips";

export default function TimerContainer() {
  // const [menu, setMenu] = useState<chipsIconType>("enfoque");
  // const [isPlaying, setIsPlaying] = useState(false);

  // const menuTimes = useMemo<Record<string, TimeType>>(
  //   () => ({
  //     enfoque: { hours: 0, min: 25, seg: 0 },
  //     "D/Corto": { hours: 0, min: 5, seg: 0 },
  //     chrono: { hours: 0, min: 0, seg: 0 },
  //   }),
  //   []
  // );

  // const updateTime = useCallback(
  //   (delta: number) => {
  //     setTime((prev) => {
  //       let totalSeconds = prev.hours * 3600 + prev.min * 60 + prev.seg + delta;
  //       totalSeconds = Math.max(0, totalSeconds);
  //       return {
  //         hours: Math.floor(totalSeconds / 3600),
  //         min: Math.floor((totalSeconds % 3600) / 60),
  //         seg: totalSeconds % 60,
  //       };
  //     });
  //   },
  //   [setTime]
  // );

  // useEffect(() => {
  //   if (!isPlaying) return;
  //   const interval = setInterval(() => updateTime(-1), 1000);
  //   return () => clearInterval(interval);
  // }, [isPlaying, updateTime]);

  // const handleTogglePlay = useCallback(() => {
  //   setIsPlaying((prev) => !prev);
  // }, [setIsPlaying]);

  // const handleReset = useCallback(() => {
  //   setIsPlaying(false);
  //   setTime(menuTimes[menu]);
  // }, [menu, menuTimes, setTime]);

  // const handleClick = useCallback(
  //   (id: string) => {
  //     if (id === "togglePlay") handleTogglePlay();
  //     if (id === "reset") handleReset();
  //   },
  //   [handleTogglePlay, handleReset]
  // );

  // const renderDigits = (num: number) =>
  //   String(num)
  //     .padStart(2, "0")
  //     .split("")
  //     .map((digit, index) => (
  //       <span
  //         key={index}
  //         className={`${
  //           fullScreen ? "w-[220px]" : "w-1/2"
  //         } flex items-center justify-center bg-white rounded-lg px-7 py-20`}
  //       >
  //         <span key={digit} className="animate-opacStart">
  //           {digit}
  //         </span>
  //       </span>
  //     ));

  return (
    <div className="w-4/6 flex flex-col gap-3 z-10">
      <TypeTimeButtons />
      {/* <div className="flex place-content-between gap-5 text-6xl relative items-center"> */}
      {/* <Minus
          onClick={() => !isPlaying && updateTime(-1)}
          className="text-white absolute -left-18"
          size={40}
          style={{
            cursor: isPlaying ? "not-allowed" : "pointer",
            color: isPlaying ? "gray" : "white",
          }}
        />
        <p
          className={`flex text-[17.5rem] gap-4 cursor-default w-full justify-center font-bold`}
        >
          {time.hours > 0 && renderDigits(time.hours)}
          {renderDigits(time.min)}
          {renderDigits(time.seg)}
        </p>
        <Plus
          onClick={() => !isPlaying && updateTime(1)}
          className="text-white absolute -right-18"
          size={40}
          style={{
            cursor: isPlaying ? "not-allowed" : "pointer",
            color: isPlaying ? "gray" : "white",
          }}
        />
      </div>
      <BarTimer time={time} initialTime={initialTime} />
      <Commands
        handleClick={handleClick}
        isPlay={isPlaying}
        fullScreen={fullScreen}
      /> */}
    </div>
  );
}
