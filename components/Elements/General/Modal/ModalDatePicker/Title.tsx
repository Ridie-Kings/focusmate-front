import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Title({ date }: { date: Date | undefined }) {
  return (
    <div className="p-4 flex flex-col gap-2 border-b border-primary-200">
      <p className="text-sm text-gray-500">Seleciona la fecha</p>
      <p className="text-2xl text-black">
        {format(date ?? new Date(), "dd MMMM yyyy", { locale: es })}
      </p>
    </div>
  );
}
