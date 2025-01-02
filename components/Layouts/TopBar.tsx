"use client";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();
  const prohibedUrl = ["login", "register"];

  if (prohibedUrl.includes(pathname.split("/")[1])) return;

  const title = () => {
    if (pathname === "/") {
      return "Dashboard";
    }
    if (pathname === "/task") {
      return "Tus Task";
    }
    if (pathname === "/calendar") {
      return "Calendar";
    }
    if (pathname === "/habitaciones") {
      return "Habitaciones";
    }
    if (pathname === "/habitos") {
      return "Mis Hábitos";
    }
    return "Dashboard";
  };
  return (
    <section className="flex place-content-between px-5 pt-10 w-full">
      <div className="flex flex-col">
        <h1 className="text-5xl ">{title()}</h1>
        <p className="text-lg">Bienvenido, Mateo!</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <input
            className="lg:flex hidden shadow-lg border border-gray-100 px-3 py-1 rounded-full w-96 transition-all focus:w-[400px] outline-none"
            name="search"
            type="text"
          />
          <Search className="size-5 absolute right-3 text-black" />
        </div>
        <Bell size={20} />
        <div className="rounded-full bg-gray-100 size-8"></div>
      </div>
    </section>
  );
}
