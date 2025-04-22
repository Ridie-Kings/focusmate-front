"use client";
import { useContext } from "react";
import MenuButtons from "../../../Elements/Pomodoro/TypeTimeButtons";
import TemplateDashboard from "../../../Elements/General/TemplateBox";
import { TimerContext } from "@/components/Provider/TimerProvider";
import Timer from "./Pomodoro/Timer";

export default function Pomodoro() {
  const { setInitialTime, toggleChronometerMode, setMenu, menu } =
    useContext(TimerContext);

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-3"
      title="Pomodoro"
      link="/pomodoro"
    >
      <MenuButtons
        menu={menu}
        setMenu={setMenu}
        setInitialTime={setInitialTime}
        toggleChronometerMode={toggleChronometerMode}
      />
      <Timer />
    </TemplateDashboard>
  );
}
