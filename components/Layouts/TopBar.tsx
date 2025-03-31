"use client";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NotificationMenu from "../Elements/Notification/NotificationMenu";

export default function TopBar() {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState<boolean>(false);

  const title = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname === "/task") return "Tus Task";
    if (pathname === "/calendar") return "Calendar";
    if (pathname === "/habitaciones") return "Habitaciones";
    if (pathname === "/habits") return "Mis Hábitos";
    return "Dashboard";
  };
  return (
    <section className="flex place-content-between p-6 w-full">
      <div className="flex flex-col flex-1">
        <h1 className="text-5xl ">{title()}</h1>
        <p className="text-lg">Bienvenido, Mateo!</p>
      </div>
      <div className="flex items-end justify-end gap-3 flex-1">
        <Search
          size={36}
          className="border border-accent cursor-pointer rounded-full text-accent p-2"
        />
        <div className="relative">
          <Bell
            size={36}
            onClick={() => setNotifOpen(!notifOpen)}
            className="border border-accent cursor-pointer rounded-full text-accent p-2"
          />
          {notifOpen && (
            <NotificationMenu onClick={() => setNotifOpen(false)} />
          )}
        </div>
        <div className="rounded-full bg-gray-100 size-9 cursor-pointer"></div>
      </div>
    </section>
  );
}
