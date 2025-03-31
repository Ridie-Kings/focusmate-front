import Chips, { chipsIconType } from "@/components/Reusable/Chips";
import { Brain, Coffee, Sofa } from "lucide-react";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { TimeType } from "./PomodoroComponent/Timer";

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
}: {
  menu: string;
  setMenu: Dispatch<SetStateAction<string>>;
  setTime: Dispatch<SetStateAction<TimeType>>;
  className?: string;
  fullScreen?: boolean;
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
                  ? "bg-primary-green text-white"
                  : "text-primary-green bg-white hover:bg-primary-green-hover hover:text-white"
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
            <Chips
              key={item.id}
              status={item.label === menu ? "pressed" : "enabled"}
              icon={item.type}
              onClick={() => {
                setTime(menuTimes[item.type]);
                setMenu(item.label);
              }}
            >
              {item.label}
            </Chips>
          ))}
        </>
      )}
    </ul>
  );
}
