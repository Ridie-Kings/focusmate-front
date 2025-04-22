import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
import Button from "@/components/Reusable/Button";
import { chipsIconType } from "@/components/Reusable/Chips";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { Brain, CircleGauge, Clock, Coffee } from "lucide-react";
import React, { Dispatch, SetStateAction, useContext, useMemo } from "react";

type TimerItem = {
  id: number;
  label: string;
  type: chipsIconType;
  icon: React.ReactNode;
};

type TypeTimeButtonsProps = {
  menu: chipsIconType;
  setMenu: Dispatch<SetStateAction<chipsIconType>>;
  setTime: Dispatch<SetStateAction<TimeType>>;
  className?: string;
  fullScreen?: boolean;
  setInitialTime: Dispatch<SetStateAction<TimeType>>;
  toggleChronometerMode: (type: boolean) => void;
};

export default function TypeTimeButtons({
  menu,
  setMenu,
  setTime,
  className = "",
  fullScreen = false,
  setInitialTime,
  toggleChronometerMode,
}: TypeTimeButtonsProps) {
  const { status, stopPomodoro } = useContext(SocketIOContext);

  const menuTimes = useMemo<Record<chipsIconType, TimeType>>(
    () => ({
      concentracion: { hours: 0, min: 25, seg: 0 },
      "D/Corto": { hours: 0, min: 5, seg: 0 },
      "D/Largo": { hours: 0, min: 15, seg: 0 },
      chrono: { hours: 0, min: 0, seg: 0 },
    }),
    []
  );

  const timerItems: TimerItem[] = useMemo(
    () => [
      {
        id: 1,
        label: "Enfoque",
        type: "concentracion",
        icon: <Brain size={18} />,
      },
      {
        id: 2,
        label: "Descanso",
        type: "D/Corto",
        icon: <Coffee size={18} />,
      },
      {
        id: 3,
        label: "Temporizador",
        type: "D/Largo",
        icon: <Clock size={18} />,
      },
      {
        id: 4,
        label: "Cronometro",
        type: "chrono",
        icon: <CircleGauge size={18} />,
      },
    ],
    []
  );

  const handleTimerSelection = (item: TimerItem) => {
    if (status?.active && status.pomodoroId) {
      stopPomodoro(status.pomodoroId);
    }

    setTime(menuTimes[item.type]);
    setMenu(item.type);
    setInitialTime(menuTimes[item.type]);

    toggleChronometerMode(item.type === "chrono");
  };

  return (
    <ul
      className={`flex w-full place-content-evenly gap-2 ${
        fullScreen ? "" : "lg:p-0 p-2"
      } ${className}`}
    >
      {timerItems.map((item) =>
        fullScreen ? (
          <button
            key={item.id}
            className={`p-2 flex-1 rounded-lg border border-white gap-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
              item.type === menu
                ? "bg-primary-500 text-white"
                : "text-primary-500 bg-white hover:bg-primary-500-hover hover:text-white"
            }`}
            onClick={() => {
              setTime(menuTimes[item.type]);
              setMenu(item.type);
              toggleChronometerMode(item.type === "chrono");
            }}
            aria-label={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ) : (
          <Button
            key={item.id}
            size="large"
            type="button"
            button="pomodoro"
            state={item.type === menu ? "pressed" : "enabled"}
            icon={item.type}
            onClick={() => handleTimerSelection(item)}
            aria-label={item.label}
          >
            {item.label}
          </Button>
        )
      )}
    </ul>
  );
}
