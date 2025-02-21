"use client";
import Timer from "./PomodoroComponent/Timer";
import { useState } from "react";
import MenuButtons from "./MenuPomodoroButtons";
import TemplateDashboard from "./TemplateBox";
import { itemVariants } from "@/components/Pages/Dashboard";

export default function PomodoroComponent() {
  const [menu, setMenu] = useState("Concentracion");

  const handleMenuChange = (label: string) => {
    setMenu(label);
  };
  return (
    <TemplateDashboard
      grid="col-span-2 row-span-3"
      title="Pomodoro"
      link="/pomodoro"
      motionElement={{ variants: itemVariants ?? {}, index: 3 }}
    >
      <MenuButtons handleMenuChange={handleMenuChange} menu={menu} />
      <Timer menu={menu} />
    </TemplateDashboard>
  );
}
