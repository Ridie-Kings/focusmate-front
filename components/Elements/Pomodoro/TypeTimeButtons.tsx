"use client";
import Button from "@/components/Reusable/Button";
import { chipsIconType } from "@/components/Reusable/Chips";
import React, { useMemo } from "react";
import { useMenu, useTimerStore } from "@/stores/timerStore";

type TimerItem = {
  id: number;
  label: string;
  type: chipsIconType;
};

export default function TypeTimeButtons() {
  const menu = useMenu();
  const { setMenu } = useTimerStore((state) => state.actions);

  const timerItems: TimerItem[] = useMemo(
    () => [
      { id: 1, label: "Enfoque", type: "focus" },
      { id: 2, label: "Descanso Corto", type: "break" },
      { id: 3, label: "Descanso Largo", type: "longBreak" },
    ],
    []
  );

  return (
    <div className="flex gap-2">
      {timerItems.map((item) => (
        <Button
          button="pomodoro"
          type="button"
          size="large"
          key={item.id}
          onClick={() => setMenu(item.type)}
          className={`${
            menu === item.type
              ? "bg-primary-500 text-white"
              : "bg-secondary-100 text-primary-500"
          }`}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
