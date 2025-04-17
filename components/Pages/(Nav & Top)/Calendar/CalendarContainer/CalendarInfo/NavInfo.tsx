import { Dispatch, SetStateAction } from "react";
import CurrentDate from "@/components/Elements/General/CurrentDate";
import Button from "@/components/Reusable/Button";

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
          <Button
            size="compact"
            type="button"
            button="primary"
            state={navType === item ? "pressed" : "enabled"}
            key={item}
            onClick={() => handleCalendar(item)}
          >
            {item}
          </Button>
        ))}
      </ul>
    </div>
  );
}
