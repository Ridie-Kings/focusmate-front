import { ReactNode } from "react";

export default function StatsCard({
  item,
}: {
  item: { label: string; number: number; icon: ReactNode };
}) {
  return (
    <div className="flex-1 p-4 flex items-center place-content-between gap-2.5 bg-primary-500 rounded-2xl text-white">
      <div className="flex flex-col place-content-between gap-2">
        <p className="text-sm">{item.label}</p>
        <p className="text-xs">{item.number}</p>
      </div>
      <div className="bg-primary-400 rounded-full p-2">{item.icon}</div>
    </div>
  );
}
