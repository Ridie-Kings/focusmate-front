"use client";
import { useEffect, useState } from "react";

import HabitsTracker from "@/components/Pages/Habits/HabitsTracker";
import ListHabits from "@/components/Pages/Habits/ListHabits";

export type itemsType = {
  id: number;
  label: string;
  type: string;
  done: boolean;
  time: string;
};

const initialItems: itemsType[] = [
  { id: 1, label: "Estudio", type: "study", done: false, time: "9:30PM" },
  { id: 2, label: "Comida", type: "food", done: false, time: "9:30PM" },
  { id: 3, label: "Dormir", type: "sleep", done: true, time: "9:30PM" },
  { id: 4, label: "Caminar", type: "sport", done: false, time: "9:30PM" },
];

export default function Habits() {
  const [habits, setHabits] = useState<itemsType[]>(initialItems);
  const [porcent, setPorcent] = useState(0);

  useEffect(() => {
    const doneCount = habits.filter((habit) => habit.done).length;
    const percent = Math.round((doneCount / habits.length) * 100);
    setPorcent(percent);
  }, [habits]);

  const handleToggle = (id: number) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      )
    );
  };

  return (
    <section className="flex flex-1">
      <HabitsTracker
        porcent={porcent}
        doneCount={habits.filter((h) => h.done).length}
        items={habits}
      />
      <ListHabits items={habits} handleToggle={handleToggle} />
    </section>
  );
}
