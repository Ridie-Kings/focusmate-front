import { Dispatch, SetStateAction } from "react";

import { ChevronLeft, ChevronRight, ListFilter, Search } from "lucide-react";

import { addDays, addMonths, format } from "date-fns";
import { es } from "date-fns/locale";

import CurrentDate from "@/components/Elements/General/CurrentDate";
import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { NavTypeType } from "../../../Calendar";

export default function NavInfo({
  navType,
  setNavType,
  setDate,
  date,
}: {
  navType: NavTypeType;
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  date: Date;
}) {
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
    <div className="flex w-full items-center place-content-between text-primary-500">
      <CurrentDate background={false} />
      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() =>
              setDate(
                navType === "Mes" ? addMonths(date, -1) : addDays(date, -1)
              )
            }
          />
          <p>
            {format(date, navType === "Mes" ? "MMMM" : "dd MMMM", {
              locale: es,
            })}
          </p>
          <ChevronRight
            className="cursor-pointer"
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
