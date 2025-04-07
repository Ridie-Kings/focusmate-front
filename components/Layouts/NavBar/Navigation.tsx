"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Grid2x2,
  Calendar,
  Bookmark,
  Lightbulb,
  Bell,
  Settings,
  CircleHelp,
} from "lucide-react";
import { NavItem } from "@/interfaces/Nav/NavTypes";

const navigationItems: NavItem[] = [
  {
    id: 1,
    label: "Dashboard",
    link: "/",
    icon: <Grid2x2 />,
  },
  {
    id: 2,
    label: "Calendar",
    link: "/calendar",
    icon: <Calendar />,
  },
  {
    id: 3,
    label: "BookMark",
    link: "/bookmark",
    icon: <Bookmark />,
  },
  {
    id: 4,
    label: "Ideas",
    link: "/ideas",
    icon: <Lightbulb />,
  },
  {
    id: 5,
    label: "Notifications",
    link: "/notification",
    icon: <Bell />,
  },
  {
    id: 6,
    label: "Settings",
    link: "/settings",
    icon: <Settings />,
  },
  {
    id: 7,
    label: "Support",
    link: "/support",
    icon: <CircleHelp />,
  },
];
export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-grow">
      <ul className="space-y-2">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.link}
              className={`
              flex items-center gap-3 p-2.5 rounded-md
              transition-all duration-300
              ${pathname === item.link ? "bg-white/20" : "hover:bg-white/10"}
            `}
              aria-label={item.label}
            >
              <span className="flex group-hover:opacity-100 opacity-0 transition-all duration-300">
                {item.icon}
              </span>
              <span
                className={`
                whitespace-nowrap
                transition-all duration-300
                group-hover:opacity-100 opacity-0

              `}
              >
                {item.label}
              </span>
              <span className="absolute left-1/2 group-hover:translate-x-0 -translate-x-1/2 group-hover:opacity-0 opacity-100 transition-all duration-200">
                {item.icon}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
