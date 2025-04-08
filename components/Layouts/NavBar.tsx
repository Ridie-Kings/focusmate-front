"use client";
import { Sparkles, LogOut } from "lucide-react";
import Navigation from "./NavBar/Navigation";

export default function NavBar({
  handleLogout,
}: {
  handleLogout: () => Promise<void>;
}) {
  return (
    <header
      className={`sticky top-0 left-0 h-screen bg-primary-500 text-white-100 flex flex-col py-6 transition-all duration-300 ease-in-out hover:w-60 hover:px-6 w-16 overflow-hidden z-50 group`}
    >
      <div className="flex items-center gap-3 mb-8 whitespace-nowrap">
        <Sparkles fill="white" size={24} />
        <Sparkles
          fill="white"
          size={24}
          className="absolute group-hover:left-5 left-1/2 group-hover:translate-x-0 -translate-x-1/2 group-hover:opacity-0 opacity-100 transition-all duration-300"
        />
        <h1
          className={`
            text-2xl font-extrabold
            transition-all duration-300
            group-hover:opacity-100 opacity-0
          `}
        >
          SherpApp
        </h1>
      </div>
      <Navigation />
      <div
        className={`
            flex items-center gap-3 p-2.5 rounded-md
            hover:bg-white/10 cursor-pointer
            transition-all duration-300
          `}
        onClick={handleLogout}
      >
        <span
          className={` whitespace-nowrap
              transition-all duration-300
              group-hover:opacity-100 opacity-0
                `}
        >
          Cerrar Sesión
        </span>
        <LogOut size={20} />
        <LogOut
          size={20}
          className="absolute group-hover:left-full left-1/2 group-hover:translate-x-0 -translate-x-1/2 group-hover:opacity-0 opacity-100 transition-all duration-300"
        />
      </div>
    </header>
  );
}
