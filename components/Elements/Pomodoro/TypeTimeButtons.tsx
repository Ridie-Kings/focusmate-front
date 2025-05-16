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
    setTime,
    menu,
    toggleChronometerMode,
    isType,
  } = useContext(TimerContext);

  const menuTimes = useMemo<Record<chipsIconType, TimeType>>(
    () => ({
      enfoque: { hours: 0, min: 25, seg: 0 },
      "D/Corto": { hours: 0, min: 5, seg: 0 },
      cronometro: { hours: 0, min: 0, seg: 0 },
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
          type: "cronometro" as chipsIconType,
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
      setMenu("cronometro");
      setTime((prev) => ({ ...prev, initialTime: menuTimes["cronometro"] }));
      toggleChronometerMode(true);
    } else {
      setMenu("enfoque");
      setTime((prev) => ({ ...prev, initialTime: menuTimes["enfoque"] }));
      toggleChronometerMode(false);
    }
  }, [isType]);

  const handleTimerSelection = (item: TimerItem) => {
    setMenu(item.type);

    setTime((prev) => ({ ...prev, initialTime: menuTimes[item.type] }));
    toggleChronometerMode(item.type === "cronometro");
  };

  if (timerItems.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-col xl:flex-row mx-auto gap-2">
      {timerItems.map((item) => (
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
          onClick={() => handleTimerSelection(item)}
          aria-label={item.label}
        >
          {item.label}
        </Button>
      ))}
    </ul>
  );
}
