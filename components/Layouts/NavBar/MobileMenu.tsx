"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import LogoutButtons from "./LogoutButtons";
import PlanButtons from "./PlanButtons";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

export default function MobileMenu({
  profile,
  handleLogout,
}: {
  profile: ProfileType | null;
  handleLogout: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1.5 right-2 z-99999 md:hidden bg-primary-500 p-2 rounded-lg text-white"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Menú principal"
        className={`fixed inset-0 bg-primary-500 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16 sm:pt-32 px-4">
          <Navigation onClick={() => setIsOpen(false)} />
          <div className="flex flex-col w-full items-center gap-2 mt-auto mb-8">
            <PlanButtons profile={profile} />
            <LogoutButtons handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </>
  );
}
