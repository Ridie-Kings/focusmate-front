import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function GoTo({ link }: { link: string }) {
  return (
    <Link
      href={link}
      className="w-8 h-8 flex items-center group hover:border-black justify-center border border-primary-300 rounded-full absolute top-2 right-3 transition-all duration-200"
    >
      <ArrowUpRight className="text-primary-300 group-hover:text-black  cursor-pointer" />
    </Link>
  );
}
