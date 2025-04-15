export default function Carousel() {
  return (
    <div className="w-1/2 h-screen sticky top-0 flex px-16 py-3.5  overflow-hidden">
      <img
        src="/images/logoPNJ.webp"
        width={1000}
        height={100}
        alt="Logo PNJ"
        className="w-full h-full object-cover rounded-3xl"
      />
      <div className="absolute left-0 top-0 bg-white w-[318px] h-[64px] rounded-2xl" />
      <div className="absolute right-13 bottom-0 bg-white w-[130px] h-[80px] rounded-2xl" />
    </div>
  );
}
