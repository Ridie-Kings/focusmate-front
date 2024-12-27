"use client";
import { Brain, Coffee, Sofa } from "lucide-react";
import Timer from "./Pomodoro/Timer";
import { useState } from "react";
import MenuButtons from "./Pomodoro/MenuButtons";
import TemplateDashboard from "../General/TemplateBox";

const items = [
  {
    id: 1,
    label: "Concentracion",
    icon: <Brain />,
  },
  { id: 2, label: "Descanso Corto", icon: <Coffee /> },
  { id: 3, label: "Descanso Largo", icon: <Sofa /> },
];

export default function Pomodoro() {
  const [menu, setMenu] = useState("Concentracion");

  const handleMenuChange = (label: string) => {
    setMenu(label);
  };
  return (
    <TemplateDashboard
      grid="col-span-2 row-span-3"
      title="Pomodoro"
      link="/pomodoro"
    >
      <MenuButtons
        items={items}
        handleMenuChange={handleMenuChange}
        menu={menu}
      />
      <Timer />
    </TemplateDashboard>
  );
}
