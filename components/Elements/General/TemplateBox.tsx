import React, { ReactNode } from "react";
import Divider from "./Divider";
import GoTo from "@/components/Elements/General/TemplateBox/GoTo";

export default function TemplateBox({
  children,
  grid,
  link,
  title,
  items,
}: {
  children: React.ReactNode;
  grid: string;
  link?: string;
  title: string;
  items?: { label: string; icon: ReactNode; onClick: () => void }[];
}) {
  return (
    <div
      className={`relative border border-primary-200 rounded-xl p-3 2xl:p-6 place-content-between hover:shadow-lg transition-all duration-200 ease-out ${grid} mx-3 md:mx-0 flex flex-col gap-4`}
    >
      {title && (
        <div className="w-full flex flex-col items-center font-medium text-2xl text-primary-500 gap-4">
          <p className="capitalize">{title}</p>
          <Divider />
        </div>
      )}
      {children}
      {items && (
        <div className="absolute flex items-center gap-2 h-9 w-18 place-content-between px-2 rounded-full border border-primary-300 top-2.5 right-15 2xl:top-5.5 2xl:right-18 cursor-pointer">
          <div
            className={`absolute size-7.5 rounded-full bg-[#d5ede2] ${
              title.toLowerCase() === "pomodoro" ? "left-1" : "left-9.25"
            } transition-all duration-200`}
          />
          {items.map((item) => (
            <div
              key={item.label}
              className="z-10 text-primary-500"
              onClick={item.onClick}
            >
              {item.icon}
            </div>
          ))}
        </div>
      )}
      <GoTo link={link} />
    </div>
  );
}
