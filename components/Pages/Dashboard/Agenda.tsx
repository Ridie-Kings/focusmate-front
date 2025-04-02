"use client";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import Calendar from "@/components/Elements/General/Calendar";
import Timeline from "./Agenda/Timeline";
import { useState } from "react";

export default function Agenda() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <TemplateDashboard
      grid="col-span-2 row-span-4 row-start-2"
      link="/calendar"
      title="Calendar"
    >
      <div className="flex w-full h-full">
        <Calendar setDate={setDate} date={date} inView btn />
        <Timeline date={date} />
      </div>
    </TemplateDashboard>
  );
}
