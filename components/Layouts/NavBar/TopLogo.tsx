import WhiteLogo from "@/components/Elements/Svg/Logos/WhiteLogo";
import Link from "next/link";

export default function TopLogo() {
  return (
    <Link
      href={"/dashboard"}
      className="group relative flex items-center gap-3 mb-8 px-4 py-2 cursor-pointer"
    >
      <span className="transition-all duration-300 delay-150 opacity-0 group-hover:opacity-100">
        <WhiteLogo size="size-8" />
      </span>

      <h1 className="text-2xl flex flex-col font-extrabold text-white whitespace-nowrap transition-all duration-300 delay-150 opacity-0 group-hover:opacity-100 translate-y-2.5">
        SherpApp
        <span className="text-sm font-semibold text-end">Beta</span>
      </h1>

      <span className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 delay-150 opacity-100 group-hover:opacity-0">
        <WhiteLogo size="size-8" />
      </span>
    </Link>
  );
}
