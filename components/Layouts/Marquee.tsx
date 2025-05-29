import Image from "next/image";

export default function Carousel() {
  return (
    <div className="w-1/2 h-screen hidden lg:flex sticky top-0  px-10 py-8  overflow-hidden">
      <Image
        src={"/images/logoPNJ.webp"}
        width={1000}
        height={1000}
        alt="Logo PNJ"
        className="w-full h-full object-cover rounded-3xl"
      />
      <div className="absolute left-0 top-0 bg-white w-[220px] h-[64px] 2xl:h-[80px] rounded-2xl" />
      <div className="absolute right-6 bottom-0 bg-white w-[220px] h-[64px] 2xl:h-[80px] rounded-2xl" />
    </div>
  );
}
