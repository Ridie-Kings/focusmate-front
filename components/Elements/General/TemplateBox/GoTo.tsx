"use client";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

export default function GoTo({ link }: { link?: string }) {
  const iconRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      iconRef.current.style.transform = "rotate(-45deg) translateY(0)";

      setTimeout(() => {
        if (iconRef.current) {
          iconRef.current.style.transform =
            "rotate(-45deg) translateY(-40px) translateX(40px)";
        }
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current) {
      iconRef.current.style.transform = "rotate(-45deg) translateY(0)";

      setTimeout(() => {
        if (iconRef.current) {
          iconRef.current.style.transform = "rotate(0deg) translateY(0)";
        }
      }, 500);
    }
  };

  return (
    <Link
      href={link ?? "/support"}
      className="px-2 h-8 flex items-center group hover:border-black justify-center border border-primary-300 rounded-full absolute top-3 right-3 2xl:top-6 2xl:right-6 transition-all duration-200 text-primary-300 hover:text-black overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {link ? (
        <ArrowUpRight
          ref={iconRef}
          className="cursor-pointer transition-all duration-300"
          style={{
            transform: "rotate(0deg) translateY(0)",
            transition: "transform 0.3s ease",
          }}
        />
      ) : (
        <>
          <Lightbulb className="cursor-pointer" />
          <p className="hidden md:block">Feedback</p>
        </>
      )}
    </Link>
  );
}
