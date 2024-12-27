"use client";
import { useState } from "react";
import ListTareas from "./ListTareas";
import TemplateDashboard from "./TemplateDashboard";
import StatusCards from "./TusTareas/StatusCards";

export default function TusTareas() {
  const [filter, setFilter] = useState<string>("");

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-6"
      title="Tus Tareas"
      link="/tareas"
    >
      <StatusCards filter={filter} setFilter={setFilter} />
      <ListTareas filter={filter} />
    </TemplateDashboard>
  );
}
