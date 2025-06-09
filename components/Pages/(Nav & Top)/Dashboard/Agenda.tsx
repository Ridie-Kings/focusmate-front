"use client";

import { useEffect, useState } from "react";

import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import Timeline from "./Agenda/Timeline";
import SmallCalendar from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";
import { useTranslations } from "next-intl";

import { isSameMonth } from "date-fns";
import { useDashboardStore, useLoadingCalendar } from "@/stores/dashboardStore";
import { useDate } from "@/stores/calendarStore";
import GetCalendarUtils from "@/lib/GetCalendarUtils";

export default function Agenda() {
  const { setCalendar, setLoading } = useDashboardStore(
    (state) => state.actions
  );
  const date = useDate();
  const loadingCalendar = useLoadingCalendar();

  const [currentMonth, setCurrentMonth] = useState<Date | undefined>(undefined);
  const t = useTranslations("Dashboard.agenda");

  useEffect(() => {
    if (currentMonth && isSameMonth(date ?? new Date(), currentMonth)) {
      return;
    }

    const { handleGetCalendarOfMonthByDate } = GetCalendarUtils({
      firstDate: date ?? new Date(),
      secondDate: date ?? new Date(),
      setCurrentMonth,
      date,
      setCalendar,
      setLoading,
      currentMonth,
    });

    handleGetCalendarOfMonthByDate(date ?? new Date());
  }, [date, setCalendar]);

  return (
    <TemplateDashboard
      grid={`col-span-4 row-span-4 row-start-2`}
      title={t("title")}
      link="/calendar"
      id="agenda-component"
    >
      <div className="flex flex-col xl:flex-row w-full h-full gap-4">
        <SmallCalendar date={date ?? new Date()} inView btn />
        <Timeline loadingEvents={loadingCalendar} />
      </div>
    </TemplateDashboard>
  );
}
