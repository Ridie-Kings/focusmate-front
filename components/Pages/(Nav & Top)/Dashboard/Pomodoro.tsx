"use client";
import MenuButtons from "../../../Elements/Pomodoro/TypeTimeButtons";
import TemplateDashboard from "../../../Elements/General/TemplateBox";
import Timer from "./Pomodoro/Timer";
import { useContext } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";

export default function Pomodoro() {
  const { setIsType, isType } = useContext(TimerContext);
  return (
    <TemplateDashboard
      grid="col-span-3 row-span-3"
      title={isType}
      items={[
        { label: "Pomodoro", onClick: () => setIsType("pomodoro") },
        { label: "Reloj", onClick: () => setIsType("reloj") },
      ]}
    >
      <MenuButtons />
      <Timer />
    </TemplateDashboard>
  );
}
