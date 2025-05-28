"use client";
import TemplateDashboard from "../../../Elements/General/TemplateBox";
import PomodoroContainer from "./Pomodoro/PomodoroContainer";
import Commands from "@/components/Elements/Pomodoro/Commands";
import { Clock, Timer as TimerIcon } from "lucide-react";
import AddTask from "./Pomodoro/AddTask";
import { useTimerStore } from "@/stores/timerStore";
import { useWebSocketStore } from "@/stores/websocketStore";

export default function Pomodoro() {
  const {
    isType,
    setIsType,
    startedElement,
    toggleChronometerMode,
    isChronometer,
  } = useTimerStore();

  const { status } = useWebSocketStore();

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
      title={isType}
      link="/pomodoro"
      id="pomodoro-component"
      items={[
        {
          label: "Pomodoro",
          icon: <Clock />,
          disabled: startedElement,
          onClick: () => handleChangeType("pomodoro", false),
        },
        {
          label: "Cronometro",
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
