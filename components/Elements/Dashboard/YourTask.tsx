"use client";
import { useState } from "react";
import ListTask from "@/components/Elements/Dashboard/ListTask";
import TemplateDashboard from "../General/TemplateBox";
import StatusCards from "@/components/Elements/Dashboard/TusTask/StatusCards";
import { Variants } from "motion/react";

export default function Task({ itemVariants }: { itemVariants: Variants }) {
  const [filter, setFilter] = useState<string>("");

  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-6"
      title="Tus Task"
      link="/task"
      motionElement={{ variants: itemVariants, index: 6 }}
    >
      <StatusCards filter={filter} setFilter={setFilter} />
      <ListTask filter={filter} />
    </TemplateDashboard>
  );
}
