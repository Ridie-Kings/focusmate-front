import { EllipsisVertical } from "lucide-react";

export default function NotificationItem() {
  return (
    <div className="w-full flex flex-col gap-4 border-b border-accent">
      <div className="flex w-full place-content-between">
        <div className="flex flex-col gap-1">
          <p>Felicidades! Completaste tus Hábitos</p>
          <p className="text-sm text-accent">Llevas una semana</p>
        </div>
        <EllipsisVertical size={24} className="cursor-pointer" />
      </div>
      <div className="flex w-full place-content-between text-xs text-accent font-light">
        <p>Hace 11 horas</p>
        <p>16:30</p>
      </div>
    </div>
  );
}
