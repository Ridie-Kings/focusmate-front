"use client";
import {
  Bell,
  Bookmark,
  Calendar,
  CircleHelp,
  Grid2x2,
  Lightbulb,
  Settings,
  Sparkles,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: number;
  label: string;
  link: string;
  icon: React.ReactNode;
}

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

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header
      className={`sticky top-0 left-0 h-screen bg-primary-green text-white-100 flex flex-col py-6 transition-all duration-300 ease-in-out hover:w-60 hover:px-6 w-16 overflow-hidden z-50 group`}
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

      <nav className="flex-grow">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className={`
                  flex items-center gap-3 p-2.5 rounded-md
                  transition-all duration-300
                  ${
                    pathname === item.link ? "bg-white/20" : "hover:bg-white/10"
                  }
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

      <div className="mt-auto space-y-2">
        {/* Profil Utilisateur
        <div
          className={`
            flex items-center gap-3 p-2.5 rounded-md
            hover:bg-white/10 cursor-pointer
            transition-all duration-300
          `}
        >
          <User size={20} />
          <span
            className={`
              transition-all duration-300
              ${isExpanded ? "opacity-100" : "opacity-0"}
            `}
          >
            Mon Profil
          </span>
        </div> */}

        <div
          className={`
            flex items-center gap-3 p-2.5 rounded-md
            hover:bg-white/10 cursor-pointer
            transition-all duration-300
          `}
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
      </div>
    </header>
  );
}
