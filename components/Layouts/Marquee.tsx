"use client";

import { Plus } from "lucide-react";
import Image from "next/image";

interface CarouselColumnProps {
  animation: string;
  reverseAnimation: string;
  sizes: string[];
  src: string[];
  textColor: string[];
}

const CarouselColumn = ({
  animation,
  reverseAnimation,
  sizes,
  src,
  textColor,
}: CarouselColumnProps) => {

  return (
    <div className="relative flex flex-col overflow-hidden flex-1 h-screen">
      <div className={`h-full flex flex-col gap-2 ${animation} whitespace-nowrap`}>
        {sizes.map((size, index) => (
          <span
            key={`normal-${index}`}
            className={`text-4xl block bg-gray-100/25 rounded-xl overflow-hidden relative text-${textColor[index]} h-${size}`}
          >
            <Image
              src={src[index]}
              width={1000}
              height={1000}
              className="absolute left-0 top-0 w-full h-full object-cover"
              alt=""
            />
            {size === "1/2" && (
              <>
                <Plus
                  className="absolute top-3 left-3 cursor-pointer"
                  size={30}
                />
                <p className="absolute bottom-2 left-5 text-base ">dasdasd</p>
              </>
            )}
          </span>
        ))}
      </div>
      <div
        className={`absolute w-full py-2 h-full flex flex-col gap-2 top-0 ${reverseAnimation} whitespace-nowrap`}
      >
        {sizes.map((size, index) => (
          <span
            key={`reverse-${index}`}
            className={`text-4xl block bg-gray-100/25 rounded-xl overflow-hidden relative text-${textColor[index]} h-${size}`}
          >
            <Image
              src={src[index]}
              width={1000}
              height={1000}
              alt=""
              className="absolute left-0 top-0 w-full h-full object-cover"
            />
            {size === "1/2" && (
              <>
                <Plus
                  className="absolute top-3 left-3 cursor-pointer"
                  size={30}
                />
                <p className="absolute bottom-2 left-5 text-base ">dasdasd</p>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Carousel() {
  const columns = [
    {
      animation: "animate-marquee-vertical",
      reverseAnimation: "animate-marquee2-vertical",
      sizes: ["1/2", "1/4", "1/4"],
      src: ["/images/test1.png", "/images/test2.png", "/images/test3.png"],
      textColor: ["white-100", "white-100", "white-100"],
    },
    {
      animation: "animate-marquee-vertical-reverse",
      reverseAnimation: "animate-marquee2-vertical-reverse",
      sizes: ["1/4", "1/2", "1/4"],
      src: ["/images/test1.png", "/images/test2.png", "/images/test3.png"],
      textColor: ["white-100", "white-100", "white-100"],
    },
    {
      animation: "animate-marquee-vertical",
      reverseAnimation: "animate-marquee2-vertical",
      sizes: ["1/4", "1/4", "1/2"],
      src: ["/images/test1.png", "/images/test2.png", "/images/test3.png"],
      textColor: ["white-100", "white-100", "white-100"],
    },
  ];

  return (
    <div className="w-[55%] flex-1 flex gap-3 px-1">
      {columns.map((column, index) => (
        <CarouselColumn key={index} {...column} />
      ))}
    </div>
  );
}
