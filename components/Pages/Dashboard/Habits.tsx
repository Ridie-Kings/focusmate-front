"use client";

import { useEffect, useState } from "react";

import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import CircleProgressBar from "@/components/Elements/General/HabitsElements/CircleProgress";
import HabitsList from "@/components/Elements/General/HabitsElements/HabitsList";
import Button from "@/components/Reusable/Button";

import { createHabit } from "@/services/Habits/createHabit";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import MountainHabits from "@/components/Elements/Svg/MountainHabits";

export default function Habits({ habits }: { habits: HabitsType[] }) {
  const [habitsList, setHabitsList] = useState<HabitsType[]>([]);
  const [porcent, setPorcent] = useState<number>(0);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    setHabitsList(habits);
  }, [habits]);

  useEffect(() => {
    setDoneCount(habits.filter((habit) => habit.status).length);
    const totalCount = habits.length;
    const percent = Math.round((doneCount / totalCount) * 100);
    setPorcent(percent);
  }, [habits, doneCount]);

  const handleCreateHabit = async () => {
    const habit = {
      name: "Habit test",
      description: "habit test description",
      frequency: "daily",
    };

    const res = await createHabit({ habit });

    setHabitsList((prev) => [...prev, habit]);

    if (res.success) {
      console.log("habit created", res.res);
    } else {
      console.log("habit error", res.res);
    }
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
          habits={habitsList}
        />
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-secondary-700 size-4 rounded-full" />
            <p>Completados</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-secondary-200 size-4 rounded-full" />
            <p>No realizado</p>
          </div>
        </div>
      </div>
      {habitsList.length > 0 ? (
        <HabitsList habits={habitsList} setHabits={setHabitsList} />
      ) : (
        <>
          <MountainHabits />
          <div className="flex flex-col items-center text-primary-500 gap-1">
            <p className="text-xl">¡Ups! No hay hábitos por aquí...</p>
            <p> Creá uno y empezá a sumar pequeños logros</p>
          </div>
        </>
      )}
      <Button onClick={handleCreateHabit} button="tertiary" type="button">
        Nuevo Habito
      </Button>
    </TemplateDashboard>
  );
}
