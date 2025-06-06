"use client";

import PomodoroContainer from "@/components/Pages/(Nav & Top)/Dashboard/Pomodoro/PomodoroContainer";
import Commands from "../Pomodoro/Commands";
import { useStatus } from "@/stores/websocketStore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";

export const PersistentPomodoro = () => {
  const pathname = usePathname();
  const status = useStatus();
  const [isOpen, setIsOpen] = useState(true);

  if (pathname === "/dashboard" || pathname === "/pomodoro" || !status) return;

  return (
    <div
      className={`fixed top-4 right-4 z-50 bg-secondary-200 border border-secondary-400 rounded-lg shadow-lg p-4 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "cursor-pointer translate-x-full"
      }`}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      <X
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      <PomodoroContainer size="small" />
      <Commands fullScreen={false} />
    </div>
  );
};
