import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function GoTo({ link }: { link: string }) {
  return (
    <Link
      href={link}
      className="w-8 h-8 flex items-center group hover:border-black justify-center border border-accent rounded-full absolute top-2 right-3"
    >
      <ArrowUpRight className="text-accent group-hover:text-black transition-all duration-200 ease-out cursor-pointer" />
    </Link>
  );
}
