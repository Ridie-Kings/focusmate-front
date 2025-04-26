import { CalendarItem } from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";
import NavigationDate from "./NavigationDate";
import Title from "./Title";
import { useEffect, useState } from "react";

export default function ModalDatePicker({
  onChange,
  date,
}: {
  date: Date;
  onChange: (e: { target: { value: string } }) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  useEffect(() => {
    onChange({
      target: { value: selectedDate ? selectedDate.toISOString() : "" },
    });
  }, [selectedDate, onChange]);

  return (
    <div className="absolute -top-35 left-25 w-[360px] drop-shadow-lg rounded-lg bg-background-primary flex flex-col z-50">
      <Title date={selectedDate} />
      <NavigationDate date={selectedDate} />
      <CalendarItem setDate={setSelectedDate} date={selectedDate} />
      <div className="flex items-center justify-end p-2">
        <button
          onClick={() => {
            onChange({ target: { value: new Date().toISOString() } });
            setSelectedDate(new Date());
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
