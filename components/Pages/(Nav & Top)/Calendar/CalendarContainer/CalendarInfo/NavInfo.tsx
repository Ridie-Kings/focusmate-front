import { Dispatch, SetStateAction } from "react";

import { ChevronLeft, ChevronRight, ListFilter, Search } from "lucide-react";

import { addDays, addMonths, format } from "date-fns";
import { es } from "date-fns/locale";

import CurrentDate from "@/components/Elements/General/CurrentDate";
import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";
import { useCalendarStore, useDate } from "@/stores/calendarStore";

export default function NavInfo({
  navType,
  setNavType,
}: {
  navType: NavTypeType;
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
}) {
  const date = useDate() ?? new Date();
  const { setDate } = useCalendarStore((state) => state.actions);

  const handleCalendar = (item: NavTypeType) => {
    setNavType(item);
    if (localStorage) localStorage.setItem("navCalendar", item);
  };
  const items = [
    { label: "Día", onClick: () => handleCalendar("Día") },
    { label: "Semana", onClick: () => handleCalendar("Semana") },
    { label: "Mes", onClick: () => handleCalendar("Mes") },
  ];

  return (
    <div className="flex flex-col sm:flex-row w-full items-center place-content-between text-primary-500">
      <CurrentDate background={false} />
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
          <ChevronLeft
            className="cursor-pointer hover:text-primary-600 transition-colors"
            onClick={() =>
              setDate(
                navType === "Mes" ? addMonths(date, -1) : addDays(date, -1)
              )
            }
          />
          <p className="font-medium">
            {format(date, navType === "Mes" ? "MMMM" : "dd MMMM", {
              locale: es,
            })}
          </p>
          <ChevronRight
            className="cursor-pointer hover:text-primary-600 transition-colors"
            onClick={() =>
              setDate(navType === "Mes" ? addMonths(date, 1) : addDays(date, 1))
            }
          />
        </div>
        <ButtonDropDown items={items} className="border-2 border-primary-500">
          {navType}
        </ButtonDropDown>
        <ListFilter className="cursor-pointer" />
        <Search className="cursor-pointer" />
      </div>
    </div>
  );
}
