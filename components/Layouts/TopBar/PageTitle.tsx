"use client";
import { usePathname } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname();

  const title = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname === "/task") return "Tus Task";
    if (pathname === "/calendar") return "Calendario";
    if (pathname === "/habitaciones") return "Habitaciones";
    if (pathname === "/habits") return "Mis Hábitos";
    if (pathname === "/support") return "Feedback";
    return "Dashboard";
  };
  return <h1 className="text-4xl md:text-5xl capitalize">{title()}</h1>;
}
