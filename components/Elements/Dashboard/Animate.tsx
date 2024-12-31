import { Frown, Laugh, Meh, Smile } from "lucide-react";
import TemplateDashboard from "../General/TemplateBox";
import { Variants } from "motion/react";

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

export default function Animate({ itemVariants }: { itemVariants: Variants }) {
  const Humor = 1;

  return (
    <TemplateDashboard
      title="¿Como te sientes hoy?"
      grid="text-base"
      link="/animate"
      motionElement={{ variants: itemVariants, index: 2 }}
    >
      <ul className="flex gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ opacity: Humor === item.id ? 1 : 0.3 }}
            className="cursor-pointer hover:scale-105 transition-opacity duration-200 ease-out"
          >
            {item.icon}
          </li>
        ))}
      </ul>
    </TemplateDashboard>
  );
}
