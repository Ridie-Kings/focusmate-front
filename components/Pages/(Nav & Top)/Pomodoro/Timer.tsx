"use client";
import { Minus, Plus } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import BarTimer from "../../../Elements/Pomodoro/BarTimer";
import { TimerContext } from "@/components/Provider/TimerProvider";
import TypeTimeButtons from "../../../Elements/Pomodoro/TypeTimeButtons";
import Commands from "@/components/Elements/Pomodoro/Commands";
// import { chipsIconType } from "@/components/Reusable/Chips";
import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
// import { toast } from "react-hot-toast";
import ShareModal from "@/components/Elements/General/Modal/ModalShare";

export default function Timer(/*{ token }: { token: string }*/) {
  // const [menu, setMenu] = useState<chipsIconType>("concentracion");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [pomodoroId, setPomodoroId] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  // const [shareCode, setShareCode] = useState('');

  const { setTime, time, setInitialTime, initialTime } =
    useContext(TimerContext);

  const {
    status,
    startPomodoro,
    stopPomodoro,
    pausePomodoro,
    resumePomodoro,
    isConnected,
  } = useContext(SocketIOContext);

  const menuTimes = useMemo(
    () => ({
      concentracion: { hours: 0, min: 25, seg: 0 },
      "D/Corto": { hours: 0, min: 5, seg: 0 },
      chrono: { hours: 0, min: 0, seg: 0 },
    }),
    []
  );

  useEffect(() => {
    if (status) {
      const { active, remainingTime, pomodoroId: id, isPaused } = status;

      if (active) {
        setTime({
          hours: Math.floor(remainingTime / 3600),
          min: Math.floor((remainingTime % 3600) / 60),
          seg: remainingTime % 60,
        });

        if (id) setPomodoroId(id);
        setIsPlaying(!isPaused);
      } else {
        if (pomodoroId && !id) {
          setPomodoroId(null);
          setIsPlaying(false);
        }
      }
    }
  }, [status, setTime, pomodoroId]);

  useEffect(() => {
    if (!isConnected || !isPlaying) return;

    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && !status) {
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
  }, [isPlaying, isConnected, status, setTime]);

  const updateTime = useCallback(
    (delta: number) => {
      setTime((prev) => {
        let totalSeconds = prev.hours * 3600 + prev.min * 60 + prev.seg + delta;
        totalSeconds = Math.max(0, totalSeconds);
        return {
          hours: Math.floor(totalSeconds / 3600),
          min: Math.floor((totalSeconds % 3600) / 60),
          seg: totalSeconds % 60,
        };
      });
    },
    [setTime]
  );

  const handleTogglePlay = useCallback(async () => {
    if (!isConnected || !startPomodoro || !pausePomodoro || !resumePomodoro) {
      setIsPlaying((prev) => !prev);
      return;
    }

    try {
      if (!isPlaying) {
        if (!pomodoroId) {
          const durationInSeconds =
            time.hours * 3600 + time.min * 60 + time.seg;
          await startPomodoro(durationInSeconds);

          setInitialTime(time);
        } else {
          await resumePomodoro();
        }
      } else if (pomodoroId) {
        await pausePomodoro();
      }
    } catch (error) {
      console.error("Error toggling pomodoro:", error);
      setIsPlaying((prev) => !prev);
    }
  }, [
    isPlaying,
    pomodoroId,
    time,
    isConnected,
    startPomodoro,
    pausePomodoro,
    resumePomodoro,
    setInitialTime,
  ]);

  const handleReset = useCallback(async () => {
    if (pomodoroId && stopPomodoro) {
      try {
        await stopPomodoro(pomodoroId);
      } catch (error) {
        console.error("Error stopping pomodoro:", error);
      }
    }

    setIsPlaying(false);
    setPomodoroId(null);
    // setTime(menuTimes[menu as keyof typeof menuTimes]);
    // setInitialTime(menuTimes[menu as keyof typeof menuTimes]);
  }, [pomodoroId, stopPomodoro, menuTimes, setTime, setInitialTime]); // menu

  // const handleShare = useCallback(async () => {
  //   if (!pomodoroId) {
  //     toast.error("No hay un pomodoro activo para compartir");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`/api/v0/pomodoro/${pomodoroId}/share`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     if (data.shareCode) {
  //       setShareCode(data.shareCode);
  //       setShareModalOpen(true);
  //     }
  //   } catch (error) {
  //     console.error("Error al compartir pomodoro:", error);
  //     toast.error("No se pudo compartir el pomodoro");
  //   }
  // }, [pomodoroId, token]);

  const handleClick = useCallback(
    (id: string) => {
      switch (id) {
        case "togglePlay":
          handleTogglePlay();
          break;
        case "reset":
          handleReset();
          break;
          // case "share":
          //   handleShare();
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
    <>
      <div className="w-1/2 max-h-[95vh] overflow-hidden flex-1 flex flex-col place-content-between items-center border border-accent p-4 gap-6 rounded-2xl">
        <TypeTimeButtons />
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
        <BarTimer time={time} initialTime={initialTime} />
        <Commands handleClick={handleClick} isPlay={isPlaying} />
      </div>

      {/* Modal de compartir */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        // shareCode={shareCode}
      />
    </>
  );
}
