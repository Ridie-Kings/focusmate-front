"use client";
import TemplateDashboard from "../General/TemplateBox";
import Calendar from "../General/Calendar";
import Timeline from "./Agenda/Timeline";
import { useState } from "react";
import { itemVariants } from "@/components/Pages/Dashboard";

export default function Agenda() {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-2"
      link="/calendar"
      title="Calendar"
      motionElement={{ variants: itemVariants, index: 4 }}
    >
      <div className="flex w-full h-full">
        <Calendar setDate={setDate} date={date} />
        <Timeline date={date} />
      </div>
    </TemplateDashboard>
  );
}
