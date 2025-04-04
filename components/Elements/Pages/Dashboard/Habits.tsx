"use client";
import { useEffect, useState } from "react";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import CircleProgressBar from "@/components/Elements/General/HabitsElements/CircleProgress";
import HabitsList from "@/components/Elements/General/HabitsElements/HabitsList";
import Button from "@/components/Reusable/Button";

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
    <TemplateDashboard
      grid="col-span-2 row-span-6 col-start-3 row-start-4"
      title="Hábitos"
      link="/habits"
    >
      <div className="w-full flex items-center place-content-evenly">
        <CircleProgressBar
          percent={porcent}
          doneCount={doneCount}
          habits={habits}
        />
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-primary-green size-4 rounded-full" />
            <p>Completados</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-black-100/15 size-4 rounded-full" />
            <p>No realizado</p>
          </div>
        </div>
      </div>
      <HabitsList habits={habits} handleToggle={handleToggle} />
      <Button button="tertiary" type="button">
        Nuevo Habito
      </Button>
    </TemplateDashboard>
  );
}
