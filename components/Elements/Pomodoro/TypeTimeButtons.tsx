"use client";
import Button from "@/components/Reusable/Button";
import { chipsIconType } from "@/components/Reusable/Chips";
import React, { useMemo } from "react";
import { useTimerStore } from "@/stores/timerStore";

type TimerItem = {
  id: number;
  label: string;
  type: chipsIconType;
};

export default function TypeTimeButtons() {
  const { menu, setMenu } = useTimerStore();

  const timerItems: TimerItem[] = useMemo(
    () => [
      { id: 1, label: "Enfoque", type: "enfoque" },
      { id: 2, label: "Descanso Corto", type: "D/Corto" },
      { id: 3, label: "Descanso Largo", type: "D/Largo" },
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
