"use client";
import Timer from "./PomodoroComponent/Timer";
import { useContext, useState } from "react";
import MenuButtons from "./MenuPomodoroButtons";
import TemplateDashboard from "./TemplateBox";
import { TimerContext } from "@/components/Provider/TimerProvider";

export default function PomodoroComponent() {
  const [menu, setMenu] = useState("concentracion");
  const { time, setTime } = useContext(TimerContext);

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-3"
      title="Pomodoro"
      link="/pomodoro"
    >
      <MenuButtons menu={menu} setMenu={setMenu} setTime={setTime} />
      <Timer time={time} setTime={setTime} menu={menu} />
    </TemplateDashboard>
  );
}
