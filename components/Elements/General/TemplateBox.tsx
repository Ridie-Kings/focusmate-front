import React from "react";
import Divider from "./Divider";
import GoTo from "@/components/Elements/General/TemplateBox/GoTo";

export default function TemplateBox({
  children,
  grid,
  link,
  title,
}: {
  children: React.ReactNode;
  grid: string;
  link?: string;
  title: string;
}) {
  return (
    <>
      <div
        className={`relative border-1 border-primary-200 rounded-xl p-3 2xl:p-6 place-content-between hover:shadow-lg transition-all duration-200 ease-out ${grid} mx-3 md:mx-0 flex flex-col gap-4`}
      >
        {title !== "" && (
          <div className="w-full flex flex-col gap-4">
            <p className={`text-center text-xl 2xl:text-2xl text-primary-500`}>
              {title}
            </p>
            <Divider />
          </div>
        )}
        {children}
        {link !== "" && <GoTo link={link} />}
      </div>
    </>
  );
}
