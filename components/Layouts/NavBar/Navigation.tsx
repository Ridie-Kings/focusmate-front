"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Grid2x2, Calendar, MessageCircle } from "lucide-react";

import { NavItem } from "@/interfaces/Nav/NavTypes";

const navigationItems: NavItem[] = [
  {
    id: 1,
    label: "Dashboard",
    link: "/",
    icon: <Grid2x2 size={24} />,
  },
  {
    id: 2,
    label: "Calendario",
    link: "/calendar",
    icon: <Calendar size={24} />,
  },
  {
    id: 3,
    label: "Feedback",
    link: "/support",
    icon: <MessageCircle size={24} />,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-grow py-4 w-full">
      <ul className="space-y-1 group w-full">
        {navigationItems.map((item) => {
          const isActive = pathname === item.link;

          return (
            <li key={item.id}>
              <Link
                href={item.link}
                className={`
                  group relative flex items-center gap-3 px-4 py-2.5 w-full
                  transition-color duration-300 hover:bg-white/10 group-hover:translate-x-0 translate-x-4
                  ${
                    isActive
                      ? "bg-white/24 text-white border-l-2 border-white"
                      : "text-gray-300"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`
                  text-white transition-all duration-300
                  ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }
                `}
                >
                  {item.icon}
                </span>

                <span
                  className={`
                  font-medium transition-all duration-300 opacity-0 group-hover:opacity-100
                `}
                >
                  {item.label}
                </span>

                <span
                  className={`
                  absolute left-4 text-gray-300 transition-all duration-300
                  ${
                    isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                  }
                `}
                >
                  {item.icon}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
