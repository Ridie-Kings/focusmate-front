import TemplateDashboard from "../General/TemplateBox";
import Calendar from "../General/Calendar";
import Timeline from "./Agenda/Timeline";

export default function Agenda() {
  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-2"
      link="/calendar"
      title="Calendar"
    >
      <div className="flex w-full h-full">
        <Calendar />
        <Timeline />
      </div>
    </TemplateDashboard>
  );
}
