"use client";
import NotificationMenu from "@/components/Elements/Notification/NotificationMenu";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function Notification() {
  const [notifOpen, setNotifOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <Bell
        size={36}
        onClick={() => setNotifOpen(!notifOpen)}
        className="border border-primary-300 cursor-pointer rounded-full text-primary-300 p-2"
      />
      {notifOpen && <NotificationMenu onClick={() => setNotifOpen(false)} />}
    </div>
  );
}
