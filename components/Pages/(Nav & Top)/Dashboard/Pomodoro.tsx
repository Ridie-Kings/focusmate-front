"use client";
import TemplateDashboard from "../../../Elements/General/TemplateBox";
import { Clock, Timer as TimerIcon } from "lucide-react";
import { useTimerStore } from "@/stores/timerStore";
import { useWebSocketStore } from "@/stores/websocketStore";
import PomodoroContainer from "./Pomodoro/PomodoroContainer";
import AddTask from "./Pomodoro/AddTask";
import Commands from "@/components/Elements/Pomodoro/Commands";
import { useTranslations } from "next-intl";

export default function Pomodoro() {
  const { setIsType, startedElement, toggleChronometerMode, isChronometer } =
    useTimerStore();

  const { status } = useWebSocketStore();
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
      {!isChronometer && <AddTask status={status} pomodoroId={status?._id} />}
      <Commands fullScreen={false} />
    </TemplateDashboard>
  );
}
