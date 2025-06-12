"use client";
import TemplateDashboard from "../../../Elements/General/TemplateBox";
import { Clock, Timer as TimerIcon } from "lucide-react";
import {
  useIsChronometer,
  useStartedElement,
  useTimerStore,
} from "@/stores/timerStore";
import PomodoroContainer from "./Pomodoro/PomodoroContainer";
import AddTask from "./Pomodoro/AddTask";
import Commands from "@/components/Elements/Pomodoro/Commands";
import { useTranslations } from "next-intl";

export default function Pomodoro() {
  const { setIsType, toggleChronometerMode } = useTimerStore(
    (state) => state.actions
  );
  const isChronometer = useIsChronometer();
  const startedElement = useStartedElement();

  const t = useTranslations("Dashboard.pomodoro");

  const handleChangeType = (
    e: "pomodoro" | "cronometro" | "temporizador",
    cronometro: boolean
  ) => {
    setIsType(e);
    toggleChronometerMode(cronometro);
  };

  return (
    <TemplateDashboard
      grid={`col-span-3 row-span-3`}
      title={t("title")}
      link="/pomodoro"
      id="pomodoro-component"
      items={[
        {
          label: t("title"),
          icon: <Clock />,
          disabled: startedElement,
          onClick: () => handleChangeType("pomodoro", false),
        },
        {
          label: t("chronometer"),
          icon: <TimerIcon />,
          disabled: startedElement,
          onClick: () => handleChangeType("cronometro", true),
        },
        // {
        //   label: "Temporizador",
        //   icon: <AlarmClock />,
        //   disabled: startedElement,
        //   onClick: () => handleChangeType("temporizador", false),
        // },
      ]}
    >
      <PomodoroContainer size="medium" />
      {!isChronometer && <AddTask />}
      <Commands fullScreen={false} />
    </TemplateDashboard>
  );
}
