"use client";
import TemplateDashboard from "../../../Elements/General/TemplateBox";
import Timer from "./Pomodoro/Timer";
import { useContext } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import Commands from "@/components/Elements/Pomodoro/Commands";
import { Clock, Timer as TimerIcon } from "lucide-react";
import AddTask from "./Pomodoro/AddTask";
import { SocketIOContext } from "@/components/Provider/WebsocketProvider";

export default function Pomodoro() {
  const {
    isType,
    setIsType,
    startedElement,
    toggleChronometerMode,
    isChronometer,
  } = useContext(TimerContext);

  const { status } = useContext(SocketIOContext);
  const handleChangeType = (
    e: "pomodoro" | "cronometro" | "temporizador",
    cronometro: boolean
  ) => {
    setIsType(e);
    toggleChronometerMode(cronometro);
  };

  return (
    <TemplateDashboard
      grid="col-span-3 row-span-3"
      title={isType}
      link="/pomodoro"
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
      <Timer />
      {!isChronometer && (
        <AddTask status={status} pomodoroId={status?._id} />
      )}
      <Commands fullScreen={false} />
    </TemplateDashboard>
  );
}
