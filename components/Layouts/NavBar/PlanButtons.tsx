import { Gem } from "lucide-react";
import Link from "next/link";

export default function PlanButtons() {
  return (
    <Link
      href={"/pricing"}
      className="
  group relative flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg
  bg-secondary-500 hover:bg-secondary-400 text-gray-300
  cursor-pointer transition-all duration-300 group-hover:w-full w-11
"
      aria-label="Mejorar Plan"
      type="button"
    >
      <span
        className="
  font-medium text-white whitespace-nowrap transition-all duration-300
  overflow-hidden max-w-0 group-hover:max-w-xs
  opacity-0 group-hover:opacity-100
"
      >
        Mejorar Plan
      </span>

      <span
        className="
  text-white transition-all duration-300
  opacity-0 group-hover:opacity-100
"
      >
        <Gem size={20} />
      </span>

      <span
        className="
  absolute right-3 text-white transition-all duration-300
  opacity-100 group-hover:opacity-0
"
      >
        <Gem size={20} />
      </span>
    </Link>
  );
}
