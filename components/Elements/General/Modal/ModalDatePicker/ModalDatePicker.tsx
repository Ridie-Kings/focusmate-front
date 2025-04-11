import { CalendarItem } from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";
import NavigationDate from "./NavigationDate";
import Title from "./Title";
import { useEffect, useState } from "react";

export default function ModalDatePicker({
  onChange,
}: {
  onChange: (e: { target: { value: string } }) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    onChange({ target: { value: date ? date.toISOString() : "" } });
  }, [date]);

  return (
    <div className="absolute -top-35 left-5 w-[360px] drop-shadow-lg rounded-lg bg-background-primary flex flex-col z-50">
      <Title date={date} />
      <NavigationDate date={date} />
      <CalendarItem setDate={setDate} date={date} />
      <div className="flex items-center justify-end p-2">
        <button
          onClick={() => {
            onChange({ target: { value: new Date().toISOString() } });
            setDate(new Date());
          }}
          className="text-sm text-primary-500 px-4 py-2 cursor-pointer"
        >
          Cancelar
        </button>
        <button
          id="guardar"
          className="text-sm text-primary-500 px-4 py-2 cursor-pointer"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
