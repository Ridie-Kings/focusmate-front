"use client";
import { useState } from "react";
import Logo from "../Svg/Logo";
import Link from "next/link";

export default function PopUp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={"/support"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed right-6 bottom-5 flex items-center rounded-lg overflow-hidden transition-all duration-500 ${
        isHovered ? "bg-primary-500 px-4 py-3 w-70" : "bg-transparent w-20 h-20"
      }`}
    >
      <Logo
        size={isHovered ? "size-14" : "size-20"}
        fill={isHovered ? "white" : "black"}
        className="transition-all duration-700 flex-shrink-0"
      />

      <div
        className={`ml-3 text-white transition-all duration-100 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
      >
        <h3 className="font-bold text-lg text-nowrap">¿Necesitas ayuda?</h3>
        <p className="text-sm">Haz clic para contactar con soporte</p>
      </div>
    </Link>
  );
}
