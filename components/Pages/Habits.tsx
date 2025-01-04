"use client";
import { useEffect, useState } from "react";
import ListHabits from "../Elements/Habits/ListHabits";
import HabitsTracker from "../Elements/Habits/HabitsTracker";

export type itemsType = {
  id: number;
  label: string;
  type: string;
  done: boolean;
  time: string;
};

const items: itemsType[] = [
  {
    id: 1,
    label: "Estudio",
    type: "study",
    done: false,
    time: "9:30PM",
  },
  {
    id: 2,
    label: "Comida",
    type: "food",
    done: false,
    time: "9:30PM",
  },
  {
    id: 3,
    label: "Dormir",
    type: "sleep",
    done: true,
    time: "9:30PM",
  },
  {
    id: 4,
    label: "Caminar",
    type: "sport",
    done: false,
    time: "9:30PM",
  },
];

export default function Habits() {
  const [habits, setHabits] = useState<itemsType[]>(items);
  const [porcent, setPorcent] = useState<number>(0);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    setDoneCount(habits.filter((habit) => habit.done).length);
    const totalCount = habits.length;
    const percent = Math.round((doneCount / totalCount) * 100);
    setPorcent(percent);
  }, [habits, doneCount]);

  const handleToggle = (id: number) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, done: !habit.done } : habit
    );
    setHabits(updatedHabits);
  };

  return (
    <section className="flex flex-1">
      <HabitsTracker porcent={porcent} doneCount={doneCount} items={habits} />
      <ListHabits items={items} handleToggle={handleToggle} />
    </section>
  );
}
