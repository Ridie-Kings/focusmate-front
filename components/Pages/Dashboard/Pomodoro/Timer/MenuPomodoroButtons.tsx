import Button from "@/components/Reusable/Button";
import { chipsIconType } from "@/components/Reusable/Chips";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { Brain, Coffee, Sofa } from "lucide-react";
import React, { Dispatch, SetStateAction, useMemo } from "react";

const items: { id: number; label: string; type: chipsIconType }[] = [
  {
    id: 1,
    label: "Enfoque",
    type: "concentracion",
  },
  { id: 2, label: "Descanso", type: "D/Corto" },
  { id: 3, label: "Siesta", type: "D/Largo" },
];

export default function MenuPomodoroButtons({
  menu,
  setMenu,
  setTime,
  className,
  fullScreen,
  setInitialTime,
}: {
  menu: string;
  setMenu: Dispatch<SetStateAction<string>>;
  setTime: Dispatch<SetStateAction<TimeType>>;
  className?: string;
  fullScreen?: boolean;
  setInitialTime: Dispatch<SetStateAction<TimeType>>;
}) {
  const menuTimes = useMemo<Record<string, TimeType>>(
    () => ({
      concentracion: { hours: 0, min: 25, seg: 0 },
      "D/Corto": { hours: 0, min: 5, seg: 0 },
      "D/Largo": { hours: 0, min: 15, seg: 0 },
    }),
    []
  );
  return (
    <ul
      className={`flex w-full place-content-evenly gap-2 lg:p-0 p-2 ${className}`}
    >
      {fullScreen ? (
        <>
          {items.map((item) => (
            <button
              key={item.id}
              className={`p-2 flex-1 rounded-lg border border-white gap-1 flex items-center justify-center cursor-pointer ${
                item.label === menu
                  ? "bg-primary-500 text-white"
                  : "text-primary-500 bg-white hover:bg-primary-500-hover hover:text-white"
              } transition-all duration-300`}
              onClick={() => {
                setTime(menuTimes[item.type]);
                setMenu(item.label);
              }}
            >
              {item.type === "concentracion" ? (
                <Brain />
              ) : item.type === "D/Corto" ? (
                <Coffee />
              ) : (
                item.type === "D/Largo" && <Sofa />
              )}
              {item.label}
            </button>
          ))}
        </>
      ) : (
        <>
          {items.map((item) => (
            <Button
              key={item.id}
              type="button"
              button="pomodoro"
              state={item.label === menu ? "pressed" : "enabled"}
              icon={item.type as "concentracion" | "D/Corto" | "D/Largo"}
              onClick={() => {
                setTime(menuTimes[item.type]);
                setMenu(item.label);
                setInitialTime(menuTimes[item.type]);
              }}
            >
              {item.label}
            </Button>
          ))}
        </>
      )}
    </ul>
  );
}
