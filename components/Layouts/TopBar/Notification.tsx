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
        className="border border-accent cursor-pointer rounded-full text-accent p-2"
      />
      {notifOpen && <NotificationMenu onClick={() => setNotifOpen(false)} />}
    </div>
  );
}
