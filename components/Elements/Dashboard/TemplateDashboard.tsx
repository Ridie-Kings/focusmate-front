import React from "react";
import Divider from "../General/Divider";
import GoTo from "./GoTo";

export default function TemplateDashboard({
  children,
  grid,
  link,
  title,
}: {
  children: React.ReactNode;
  grid: string;
  link: string;
  title: string;
}) {
  return (
    <div
      className={`relative border border-gray-100 rounded-xl p-3 place-content-between items-center hover:shadow-lg transition-all duration-200 ease-out ${grid} flex flex-col`}
    >
      <div className="w-full flex flex-col gap-4">
        <p className={`text-center text-lg 2xl:text-2xl`}>{title}</p>
        <Divider />
      </div>
      {children}
      <GoTo link={link} />
    </div>
  );
}
