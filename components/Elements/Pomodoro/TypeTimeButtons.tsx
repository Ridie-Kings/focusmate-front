"use client";
import { TimerContext } from "@/components/Provider/TimerProvider";
import Button from "@/components/Reusable/Button";
import { chipsIconType } from "@/components/Reusable/Chips";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import React, { useContext, useEffect, useMemo } from "react";

type TimerItem = {
  id: number;
  label: string;
  type: chipsIconType;
};

export default function TypeTimeButtons() {
  const {
    startedElement,
    setMenu,
    menu,
    setInitialTime,
    toggleChronometerMode,
    fullScreen,
    isType,
  } = useContext(TimerContext);

  const menuTimes = useMemo<Record<chipsIconType, TimeType>>(
    () => ({
      enfoque: { hours: 0, min: 25, seg: 0 },
      "D/Corto": { hours: 0, min: 5, seg: 0 },
      chrono: { hours: 0, min: 0, seg: 0 },
      temp: { hours: 0, min: 0, seg: 0 },
    }),
    []
  );

  const timerItems = useMemo(() => {
    if (isType === "pomodoro") {
      return [
        {
          id: 1,
          label: "Concentración",
          type: "enfoque" as chipsIconType,
        },
        {
          id: 2,
          label: "Descanso Corto",
          type: "D/Corto" as chipsIconType,
        },
        {
          id: 3,
          label: "Descanso largo",
          type: "D/Largo" as chipsIconType,
        },
      ];
    } else if (isType === "cronometro") {
      return [
        {
          id: 1,
          label: "Cronómetro",
          type: "chrono" as chipsIconType,
        },
        {
          id: 2,
          label: "Temporizador",
          type: "temp" as chipsIconType,
        },
      ];
    }
    return [];
  }, [isType]);

  useEffect(() => {
    if (isType === "cronometro") {
      setMenu("chrono");
      setInitialTime(menuTimes["chrono"]);
      toggleChronometerMode(true);
    } else {
      setMenu("enfoque");
      setInitialTime(menuTimes["enfoque"]);
      toggleChronometerMode(false);
    }
  }, [isType]);

  const handleTimerSelection = (item: TimerItem) => {
    setMenu(item.type);

    setInitialTime(menuTimes[item.type]);
    toggleChronometerMode(item.type === "chrono");
  };

  if (timerItems.length === 0) {
    return null;
  }

  return (
    <ul
      className={`flex flex-col xl:flex-row mx-auto gap-2 ${
        fullScreen ? "" : "lg:p-0 p-2"
      }`}
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
            onClick={() => handleTimerSelection(item)}
            aria-label={item.label}
            disabled={startedElement}
          >
            <span>{item.label}</span>
          </button>
        ) : (
          <Button
            key={item.id}
            size="large"
            type="button"
            button="pomodoro"
            state={
              startedElement && item.type === menu
                ? "disabled-pressed"
                : startedElement
                ? "disabled"
                : item.type === menu
                ? "pressed"
                : "enabled"
            }
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
