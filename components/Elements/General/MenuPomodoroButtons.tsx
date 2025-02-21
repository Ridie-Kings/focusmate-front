import { Brain, Coffee, Sofa } from "lucide-react";
import React from "react";

const items = [
  {
    id: 1,
    label: "Concentracion",
    icon: <Brain />,
  },
  { id: 2, label: "Descanso Corto", icon: <Coffee /> },
  { id: 3, label: "Descanso Largo", icon: <Sofa /> },
];

export default function MenuPomodoroButtons({
  handleMenuChange,
  menu,
  className,
}: {
  handleMenuChange: (label: string) => void;
  menu: string;
  className?: string;
}) {
  return (
    <ul
      className={`flex w-full place-content-evenly gap-3 lg:p-0 p-2 ${className}`}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className={`flex gap-2 border text-lg font-medium border-white-100 items-center justify-center lg:px-4 lg:py-2 p-2 flex-1 rounded-lg transition-all duration-200 ease-out cursor-pointer ${
            item.label === menu
              ? "bg-white-100 text-black"
              : "hover:bg-black-100 hover:text-white-100 text-white"
          }`}
          onClick={() => handleMenuChange(item.label)}
        >
          <span className="xl:flex lg:hidden flex">{item.icon}</span>
          <p className="md:flex hidden">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
