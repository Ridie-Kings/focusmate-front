"use client";
import { usePathname } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname();

  const title = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/task") return "Tus Tareas";
    if (pathname === "/calendar") return "Calendario";
    if (pathname === "/habitaciones") return "Habitaciones";
    if (pathname === "/habits") return "Mis Hábitos";
    if (pathname === "/pomodoro") return "Pomodoro";
    if (pathname === "/support") return "Feedback";
    if (pathname === "/streaks-ranking") return "Ranking";
    return pathname.split("/")[1].split("-").join(" ");
  };
  return (
    <h1 className="text-xl sm:text-4xl md:text-5xl capitalize -translate-y-10 group-hover:translate-0 transition-all duration-700">
      {title()}
    </h1>
  );
}
