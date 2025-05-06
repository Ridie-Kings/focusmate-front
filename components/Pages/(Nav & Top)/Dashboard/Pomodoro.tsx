"use client";
import MenuButtons from "../../../Elements/Pomodoro/TypeTimeButtons";
import TemplateDashboard from "../../../Elements/General/TemplateBox";
import Timer from "./Pomodoro/Timer";
import { useContext } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import { Hourglass, Timer as TimerIcon } from "lucide-react";

export default function Pomodoro() {
  const { setIsType, isType } = useContext(TimerContext);
  console.log(isType);

  return (
    <TemplateDashboard
      grid="col-span-3 row-span-3"
      title={isType}
      link="/pomodoro"
      items={[
        {
          label: "Pomodoro",
          onClick: () => setIsType("pomodoro"),
          icon: "🍅",
        },
        {
          label: "Reloj",
          onClick: () => setIsType("reloj"),
          icon: <TimerIcon size={19} />,
        },
      ]}
    >
      <MenuButtons />
      <Timer />
    </TemplateDashboard>
  );
}
