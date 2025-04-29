import { Dispatch, SetStateAction } from "react";
import CurrentDate from "@/components/Elements/General/CurrentDate";
import Button from "@/components/Reusable/Button";
import { ChevronLeft, ChevronRight, ListFilter, Search } from "lucide-react";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import ButtonDropDown from "@/components/Reusable/ButtonDropDown";

export default function NavInfo({
  navType,
  setNavType,
  setDate,
  date,
}: {
  navType: string;
  setNavType: Dispatch<SetStateAction<string>>;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  date: Date;
}) {
  const handleCalendar = (item: string) => {
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
            onClick={() => setDate(addDays(date, -1))}
          />
          <p>{format(date, "dd MMMM", { locale: es })}</p>
          <ChevronRight
            className="cursor-pointer"
            onClick={() => setDate(addDays(date, 1))}
          />
        </div>
        <ButtonDropDown items={items}>{navType}</ButtonDropDown>
        <ListFilter className="cursor-pointer" />
        <Search className="cursor-pointer" />
      </div>
    </div>
  );
}
