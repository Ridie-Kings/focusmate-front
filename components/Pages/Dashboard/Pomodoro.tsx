"use client";
import { useContext, useState } from "react";
import MenuButtons from "../../Elements/Pomodoro/TypeTimeButtons";
import TemplateDashboard from "../../Elements/General/TemplateBox";
import { TimerContext } from "@/components/Provider/TimerProvider";
import Timer from "./Pomodoro/Timer";

export default function Pomodoro() {
  const [menu, setMenu] = useState<string>("concentracion");
  const { time, setTime, setInitialTime } = useContext(TimerContext);

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-3"
      title="Pomodoro"
      link="/pomodoro"
    >
      <MenuButtons
        menu={menu}
        setMenu={setMenu}
        setTime={setTime}
        setInitialTime={setInitialTime}
      />
      <Timer time={time} setTime={setTime} menu={menu} />
    </TemplateDashboard>
  );
}
