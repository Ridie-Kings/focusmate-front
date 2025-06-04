"use client";
import { useState } from "react";
import Link from "next/link";
import WhiteLogo from "../Svg/Logos/WhiteLogo";
import GreenLogo_fill from "../Svg/Logos/GreenLogo_Fill";
import { useTranslations } from "next-intl";

export default function PopUp() {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("PopUp");

  return (
    <Link
      href={"/support"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed right-6 bottom-5 z-50 flex items-center rounded-lg overflow-hidden transition-all duration-500 ${
        isHovered ? "bg-primary-500 px-4 py-3 w-70" : "bg-transparent size-20"
      }`}
    >
      <div className="flex items-center">
        {isHovered ? (
          <WhiteLogo
            size="size-14"
            className="transition-all duration-700 flex-shrink-0"
          />
        ) : (
          <GreenLogo_fill
            size="size-20"
            className="transition-all duration-700 flex-shrink-0"
          />
        )}

        <div
          className={`ml-3 text-white transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <h3 className="font-bold text-lg whitespace-nowrap">{t("title")}</h3>
          <p className="text-sm">{t("description")}</p>
        </div>
      </div>
    </Link>
  );
}
