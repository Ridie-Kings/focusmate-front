import TemplateDashboard from "./TemplateDashboard";
import Calender from "../General/Calender";
import Timeline from "./Agenda/Timeline";

export default function Agenda() {
  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-2"
      link="/task"
      title="Calendario"
    >
      <div className="flex w-full h-full">
        <Calender />
        <Timeline />
      </div>
    </TemplateDashboard>
  );
}
