import ListTareas from "./ListTareas";
import TemplateDashboard from "./TemplateDashboard";
import StatusCards from "./TusTareas/StatusCards";

export default function TusTareas() {
  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-6"
      title="Tus Tareas"
      link="/tusTareas"
    >
      <StatusCards />
      <ListTareas />
    </TemplateDashboard>
  );
}
