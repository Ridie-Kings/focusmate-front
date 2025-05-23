import { Award, GraduationCap, PersonStanding } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function NavigationStats({
  selectedPage,
  setSelectedPage,
}: {
  selectedPage: "info" | "academic" | "member";
  setSelectedPage: Dispatch<SetStateAction<"info" | "academic" | "member">>;
}) {
  const navItems: {
    icon: ReactNode;
    label: string;
    link: "info" | "academic" | "member";
  }[] = [
    { icon: <PersonStanding />, label: "Información general", link: "info" },
    { icon: <GraduationCap />, label: "Académico", link: "academic" },
    { icon: <Award />, label: "Membresía y pago", link: "member" },
  ];

  return (
    <nav className="flex place-content-between pb-2 border-b border-primary-200 overflow-x-auto sm:text-wrap text-nowrap">
      {navItems.map((item) => (
        <div
          key={item.label}
          className={`flex px-4 py-3.5 gap-2 ${
            selectedPage === item.link
              ? "text-black bg-secondary-100"
              : "text-gray-400"
          }  hover:text-black hover:bg-secondary-200 rounded-2xl cursor-pointer transition-all duration-300`}
          onClick={() => setSelectedPage(item.link)}
        >
          {item.icon}
          <p>{item.label}</p>
        </div>
      ))}
    </nav>
  );
}
