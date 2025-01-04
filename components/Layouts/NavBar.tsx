"use client";
import { Grid2x2, Home } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    id: 1,
    label: "Home",
    icon: <Home />,
  },
  {
    id: 2,
    label: "Animate",
    icon: <Grid2x2 />,
  },
  {
    id: 3,
    label: "Pomodoro",
    icon: <Grid2x2 />,
  },
  {
    id: 4,
    label: "Calendar",
    icon: <Grid2x2 />,
  },
  {
    id: 5,
    label: "Habits",
    icon: <Grid2x2 />,
  },
  {
    id: 6,
    label: "Your Task",
    icon: <Grid2x2 />,
  },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 left-0 h-screen w-60 bg-black-100 text-white-100 flex flex-col py-10 px-8 gap-10">
      <p className="text-4xl text-center">Tasko</p>
      <div className="flex flex-col gap-4">
        <p className="text-2xl ml-2">Menu</p>
        <ul className="flex flex-col justify-around gap-3">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={
                  item.label === "Home"
                    ? "/"
                    : "/" + item.label.toLowerCase().replace(" ", "")
                }
                className="text-lg flex gap-5 h-full group font-extralight"
              >
                {pathname.split("/")[1] === item.label.toLowerCase() && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "0.125rem" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.075 }}
                    className="bg-white-100 h-full rounded-full group-hover:translate-x-1 transition-transform duration-100 ease-in-out"
                  ></motion.div>
                )}
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
