"use client";
import { usePathname } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname();

  const title = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname === "/task") return "Tus Task";
    if (pathname === "/calendar") return "Calendar";
    if (pathname === "/habitaciones") return "Habitaciones";
    if (pathname === "/habits") return "Mis Hábitos";
    return "Dashboard";
  };
  return <h1 className="text-5xl ">{title()}</h1>;
}
