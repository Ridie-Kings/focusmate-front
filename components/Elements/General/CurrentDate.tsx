import { format } from "date-fns";

export default function CurrentDate({ className }: { className?: string }) {
  const today = new Date();

  return (
    <div
      className={`border border-gray-100 rounded-xl px-5 py-2 -space-y-2 hover:shadow-lg transition-all duration-200 ease-out ${className}`}
    >
      <p className="text-lg">{format(today, "eeee")}</p>
      <p className="text-4xl">{format(today, "HH:mm")}</p>
      <p className="text-4xl">{format(today, "MMMM")}</p>
    </div>
  );
}
