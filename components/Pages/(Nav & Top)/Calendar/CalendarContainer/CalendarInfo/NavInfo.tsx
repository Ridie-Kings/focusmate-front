import { Dispatch, SetStateAction } from "react";
import CurrentDate from "@/components/Elements/General/CurrentDate";
import Chips from "@/components/Reusable/Chips";

const items = ["Día", "Semana", "Mes"];

export default function NavInfo({
  navType,
  setNavType,
}: {
  navType: string;
  setNavType: Dispatch<SetStateAction<string>>;
}) {
  const handleCalendar = (item: string) => {
    setNavType(item);
    if (localStorage) localStorage.setItem("navCalendar", item);
  };
  return (
    <div className="flex w-full items-center place-content-between">
      <CurrentDate background={false} />
      <ul className="flex gap-3">
        {items.map((item) => (
          <Chips
            key={item}
            icon="undefined"
            status={navType === item ? "pressed" : "enabled"}
            onClick={() => handleCalendar(item)}
            className="w-20"
          >
            {item}
          </Chips>
        ))}
      </ul>
    </div>
  );
}
