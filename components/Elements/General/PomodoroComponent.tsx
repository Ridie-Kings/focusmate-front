"use client";
import { Brain, Coffee, Sofa } from "lucide-react";
import Timer from "./PomodoroComponent/Timer";
import { useState } from "react";
import MenuButtons from "./PomodoroComponent/MenuButtons";
import TemplateDashboard from "./TemplateBox";
import { Variants } from "motion/react";

const items = [
  {
    id: 1,
    label: "Concentracion",
    icon: <Brain />,
  },
  { id: 2, label: "Descanso Corto", icon: <Coffee /> },
  { id: 3, label: "Descanso Largo", icon: <Sofa /> },
];

export default function PomodoroComponent({
  itemVariants,
  component,
}: {
  itemVariants?: Variants;
  component?: boolean;
}) {
  const [menu, setMenu] = useState("Concentracion");

  const handleMenuChange = (label: string) => {
    setMenu(label);
  };
  return (
    <>
      {component ? (
        <div className="w-full flex flex-col items-center">
          <MenuButtons
            items={items}
            handleMenuChange={handleMenuChange}
            menu={menu}
            className="*:flex-1 gap-3 lg:px-5"
          />
          <Timer menu={menu} />
        </div>
      ) : (
        <TemplateDashboard
          grid="col-span-2 row-span-3"
          title="Pomodoro"
          link="/pomodoro"
          motionElement={{ variants: itemVariants ?? {}, index: 3 }}
        >
          <MenuButtons
            items={items}
            handleMenuChange={handleMenuChange}
            menu={menu}
          />
          <Timer menu={menu} />
        </TemplateDashboard>
      )}
    </>
  );
}
