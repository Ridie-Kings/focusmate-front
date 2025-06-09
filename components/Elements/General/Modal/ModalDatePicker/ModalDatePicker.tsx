import { CalendarItem } from "@/components/Elements/Calendar/SmallCalendar/SmallCalendar";
import NavigationDate from "./NavigationDate";
import Title from "./Title";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ModalDatePicker({
  onChange,
  date,
}: {
  date: Date;
  onChange: (e: { target: { value: string | undefined } }) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const t = useTranslations("Common");

  useEffect(() => {
    onChange({
      target: { value: selectedDate ? selectedDate.toISOString() : "" },
    });
  }, [selectedDate]);

  return (
    <div className="absolute -top-35 left-25 w-[360px] drop-shadow-lg rounded-lg bg-background-primary flex flex-col z-50">
      <Title date={selectedDate} />
      <NavigationDate
        date={selectedDate ?? new Date()}
        setDate={setSelectedDate}
      />
      <CalendarItem
        setDate={setSelectedDate}
        date={selectedDate ?? new Date()}
      />
      <div className="flex items-center justify-end p-2">
        <button
          id="close"
          onClick={() => {
            onChange({ target: { value: undefined } });
            setSelectedDate(undefined);
          }}
          className="text-sm text-primary-500 px-4 py-2 cursor-pointer"
        >
          {t("cancel")}
        </button>
        <button
          id="save"
          className="text-sm text-primary-500 px-4 py-2 cursor-pointer"
        >
          {t("save")}
        </button>
      </div>
    </div>
  );
}
