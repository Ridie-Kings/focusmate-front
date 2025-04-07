"use client";

import Image from "next/image";

export default function Carousel() {
  return (
    <div className="w-[55%] flex-1 flex gap-3 px-1 py-5">
      <Image
        src={"/images/svg/login.svg"}
        width={100}
        height={100}
        alt="svg"
        className="w-[100vw] h-[95vh] sticky top-10"
      />
    </div>
  );
}
