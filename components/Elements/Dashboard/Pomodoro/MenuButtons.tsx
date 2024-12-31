import React from "react";
export default function MenuButtons({
  items,
  handleMenuChange,
  menu,
}: {
  items: { id: number; label: string; icon: React.ReactNode }[];
  handleMenuChange: (label: string) => void;
  menu: string;
}) {
  return (
    <ul className="flex w-full place-content-evenly">
      {items.map((item) => (
        <li
          key={item.id}
          className={`flex gap-2 border border-gray-100  px-4 py-2 rounded-lg transition-all duration-200 ease-out cursor-pointer ${
            item.label === menu
              ? "bg-black-100 text-white-100"
              : "hover:bg-black-100 hover:text-white-100"
          }`}
          onClick={() => handleMenuChange(item.label)}
        >
          {item.icon}
          {item.label}
        </li>
      ))}
    </ul>
  );
}
