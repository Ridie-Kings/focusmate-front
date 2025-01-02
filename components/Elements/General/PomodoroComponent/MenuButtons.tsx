import React from "react";
export default function MenuButtons({
  items,
  handleMenuChange,
  menu,
  className,
}: {
  items: { id: number; label: string; icon: React.ReactNode }[];
  handleMenuChange: (label: string) => void;
  menu: string;
  className?: string;
}) {
  return (
    <ul className={`flex w-full place-content-evenly lg:p-0 p-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item.id}
          className={`flex gap-2 border border-gray-100  lg:px-4 lg:py-2 p-2 rounded-lg transition-all duration-200 ease-out cursor-pointer ${
            item.label === menu
              ? "bg-black-100 text-white-100"
              : "hover:bg-black-100 hover:text-white-100"
          }`}
          onClick={() => handleMenuChange(item.label)}
        >
          <span className="xl:flex lg:hidden flex">{item.icon}</span>
          <p className="md:flex hidden">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
