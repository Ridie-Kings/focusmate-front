import { Frown, Laugh, Meh, Smile } from "lucide-react";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";

const items = [
  {
    id: 1,
    icon: <Laugh size={30} />,
  },
  {
    id: 2,
    icon: <Smile size={30} />,
  },
  {
    id: 3,
    icon: <Meh size={30} />,
  },
  {
    id: 4,
    icon: <Frown size={30} />,
  },
];

export default function Animate() {
  const Humor = 1;

  return (
    <TemplateDashboard
      title="¿Como te sientes hoy?"
      grid="text-base items-center"
      link="/animate"
    >
      <ul className="flex gap-2 lg:p-0 p-2">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ opacity: Humor === item.id ? 1 : 0.5 }}
            className="cursor-pointer text-accent hover:scale-105 transition-opacity duration-200 ease-out"
          >
            {item.icon}
          </li>
        ))}
      </ul>
    </TemplateDashboard>
  );
}
