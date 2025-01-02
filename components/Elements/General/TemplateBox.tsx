import React from "react";
import Divider from "./Divider";
import GoTo from "../Dashboard/GoTo";
import { Variants, motion } from "motion/react";

export default function TemplateBox({
  children,
  grid,
  link,
  title,
  motionElement,
}: {
  children: React.ReactNode;
  grid: string;
  link: string;
  title: string;
  motionElement?: { variants: Variants; index: number };
}) {
  return (
    <>
      {motion ? (
        <motion.div
          variants={motionElement?.variants}
          custom={motionElement?.index}
          className={`relative border-2 rounded-xl p-3 place-content-between items-center hover:shadow-lg transition-all duration-200 ease-out ${grid}  flex flex-col`}
        >
          {title !== "" && (
            <div className="w-full flex flex-col gap-4">
              <p className={`text-center text-lg 2xl:text-2xl`}>{title}</p>
              <Divider />
            </div>
          )}
          {children}
          {link !== "" && <GoTo link={link} />}
        </motion.div>
      ) : (
        <div
          className={`relative border-2 rounded-xl p-3 place-content-between items-center hover:shadow-lg transition-all duration-200 ease-out ${grid} flex flex-col`}
        >
          {title !== "" && (
            <div className="w-full flex flex-col gap-4">
              <p className={`text-center text-lg 2xl:text-2xl`}>{title}</p>
              <Divider />
            </div>
          )}
          {children}
          {link !== "" && <GoTo link={link} />}
        </div>
      )}
    </>
  );
}
