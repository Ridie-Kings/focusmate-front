"use client";

import { useEffect, useState } from "react";

import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import CircleProgressBar from "@/components/Elements/General/HabitsElements/CircleProgress";
import HabitsList from "@/components/Elements/General/HabitsElements/HabitsList";
import Button from "@/components/Reusable/Button";

import { HabitsType } from "@/interfaces/Habits/HabitsType";
import MountainHabits from "@/components/Elements/Svg/Mountain/MountainHabits";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useModalStore } from "@/stores/modalStore";
import { useTranslations } from "next-intl";

export default function Habits({ habitsList }: { habitsList: HabitsType[] }) {
  const { habits, setHabits } = useDashboardStore();
  const { setIsOpen } = useModalStore();
  const [porcent, setPorcent] = useState<number>(0);
  const [doneCount, setDoneCount] = useState(0);
  const t = useTranslations("Dashboard.habits");
  const t2 = useTranslations("Common.buttons");

  useEffect(() => {
    setHabits(habitsList);
  }, [habitsList, setHabits]);

  useEffect(() => {
    const completedHabits = habits.filter((habit) => habit.status).length;
    setDoneCount(completedHabits);
    const totalCount = habits.length;
    const percent =
      totalCount > 0 ? Math.round((completedHabits / totalCount) * 100) : 0;
    setPorcent(percent);
  }, [habits]);

  return (
    <TemplateDashboard
      grid={`col-span-3 row-span-6`}
      title={t("title")}
      link="/habits"
      id="habits-component"
    >
      <div className="w-full flex flex-col xl:flex-row items-center place-content-evenly">
        <CircleProgressBar
          percent={porcent}
          doneCount={doneCount}
          habits={habits}
        />
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-secondary-700 size-4 rounded-full" />
            <p>{t("completed")}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-secondary-200 size-4 rounded-full" />
            <p>{t("notCompleted")}</p>
          </div>
        </div>
      </div>
      {habits.length > 0 ? (
        <HabitsList habits={habits} setHabits={setHabits} />
      ) : (
        <div className="bg-quaternary-100 rounded-2xl py-4 flex flex-col gap-3">
          <MountainHabits />
          <div className="flex flex-col items-center text-primary-500 gap-1 text-center">
            <p className="text-xl font-medium">{t("noHabits")}</p>
            <p className="text-sm">{t("noHabitsDescription")}</p>
          </div>
        </div>
      )}
      <Button
        size="large"
        onClick={() => setIsOpen({ text: "habit" })}
        button="tertiary"
        type="button"
      >
        {t2("newHabit")}
      </Button>
    </TemplateDashboard>
  );
}
