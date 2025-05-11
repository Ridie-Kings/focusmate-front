import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { Dispatch, SetStateAction } from "react";

export default function SelectTimeButtons({
  setSelectedMonth,
  setSelectedYear,
  selectedMonth,
  selectedYear,
}: {
  setSelectedMonth: Dispatch<SetStateAction<string>>;
  setSelectedYear: Dispatch<SetStateAction<string>>;
  selectedMonth: string;
  selectedYear: string;
}) {
  const monthOptions = [
    "enero-febrero",
    "marzo-abril",
    "mayo-junio",
    "julio-agosto",
    "septiembre-octubre",
    "noviembre-diciembre",
  ];

  const yearOptions = ["2023", "2024", "2025", "2026"];
  return (
    <div className="w-full flex justify-end gap-2">
      <ButtonDropDown
        className="border-2 border-secondary-700 py-0.5"
        items={monthOptions.map((month) => ({
          label: month,
          onClick: () => setSelectedMonth(month),
        }))}
      >
        {selectedMonth}
      </ButtonDropDown>
      <ButtonDropDown
        className="border-2 border-secondary-700 py-0.5"
        items={yearOptions.map((year) => ({
          label: year,
          onClick: () => setSelectedYear(year),
        }))}
      >
        {selectedYear}
      </ButtonDropDown>
    </div>
  );
}
