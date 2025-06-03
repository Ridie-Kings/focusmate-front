import React, { ReactNode } from "react";
import Divider from "./Divider";
import GoTo from "@/components/Elements/General/TemplateBox/GoTo";

export default function TemplateBox({
  children,
  grid,
  link,
  title,
  items,
  onClick,
  id,
}: {
  children: React.ReactNode;
  grid: string;
  link?: string;
  title: string;
  items?: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    disabled?: boolean;
  }[];
  onClick?: () => void;
  id?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative border border-primary-200 rounded-3xl p-3 2xl:p-6 place-content-between hover:shadow-lg transition-all duration-200 ease-out ${grid} mx-3 md:mx-0 flex flex-col gap-4 overflow-hidden`}
      id={id}
    >
      {items ? (
        <div className="flex flex-col items-center gap-4" id="nav-component">
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center w-full gap-2 px-2">
              {items.map((item) => (
                <button
                  key={item.label}
                  className="flex flex-col items-center flex-1 gap-1 text-primary-500 cursor-pointer disabled:cursor-not-allowed"
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
            <div
              style={{
                width: 100 / items.length + "%",
                transform: `translateX(${
                  title === "Pomodoro"
                    ? "0"
                    : title === "Cronómetro" || title === "Chronometer"
                    ? "100%"
                    : "200%"
                })`,
              }}
              className="w-1/3 h-0.5 bg-primary-500 transition-all duration-300"
            />
          </div>
        </div>
      ) : (
        title && (
          <div className="w-full flex flex-col items-center font-medium text-2xl text-primary-500 gap-4">
            <p className="capitalize">{title}</p>
            <Divider />
          </div>
        )
      )}

      {children}

      {link && <GoTo link={link} />}
    </div>
  );
}
