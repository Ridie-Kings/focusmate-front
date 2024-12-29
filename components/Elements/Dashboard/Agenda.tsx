import TemplateDashboard from "../General/TemplateBox";
import Calendar from "../General/Calendar";
import Timeline from "./Agenda/Timeline";
import { Variants } from "motion/react";

export default function Agenda({ itemVariants }: { itemVariants: Variants }) {
  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-2"
      link="/calendar"
      title="Calendar"
      motionElement={{ variants: itemVariants, index: 4 }}
    >
      <div className="flex w-full h-full">
        <Calendar />
        <Timeline />
      </div>
    </TemplateDashboard>
  );
}
