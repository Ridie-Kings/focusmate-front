"use client";
import {
  useIsType,
  useStartedElement,
  useTimerStore,
} from "@/stores/timerStore";
import { Clock, TimerIcon } from "lucide-react";

export default function PomodoroNav() {
  const startedElement = useStartedElement();
  const isType = useIsType();
  const { setIsType, toggleChronometerMode } = useTimerStore(
    (state) => state.actions
  );

  const handleChangeType = (
    e: "pomodoro" | "cronometro" | "temporizador",
    cronometro: boolean
  ) => {
    setIsType(e);
    toggleChronometerMode(cronometro);
  };

  const items = [
    {
      label: "Pomodoro",
      icon: <Clock />,
      disabled: startedElement,
      onClick: () => handleChangeType("pomodoro", false),
    },
    {
      label: "Cronometro",
      icon: <TimerIcon />,
      disabled: startedElement,
      onClick: () => handleChangeType("cronometro", true),
    },
    // {
    //   label: "Temporizador",
    //   icon: <AlarmClock />,
    //   disabled: startedElement,
    //   onClick: () => handleChangeType("temporizador", false),
    // },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center w-full gap-2 px-2">
          {items.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center flex-1 gap-1 text-primary-500 cursor-pointer disabled:cursor-not-allowed"
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
        <div
          style={{
            width: 100 / items.length + "%",
            transform: `translateX(${
              isType === "pomodoro"
                ? "0"
                : isType === "cronometro"
                ? "100%"
                : "200%"
            })`,
          }}
          className="h-0.5 bg-primary-500 transition-all duration-300"
        />
      </div>
    </div>
  );
}
