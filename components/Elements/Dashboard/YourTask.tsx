"use client";
import { useState } from "react";
import ListTask from "@/components/Elements/Dashboard/ListTask";
import TemplateDashboard from "../General/TemplateBox";
import StatusCards from "@/components/Elements/Dashboard/TusTask/StatusCards";

export default function Task() {
  const [filter, setFilter] = useState<string>("");

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-6"
      title="Tus Task"
      link="/task"
    >
      <StatusCards filter={filter} setFilter={setFilter} />
      <ListTask filter={filter} />
    </TemplateDashboard>
  );
}
