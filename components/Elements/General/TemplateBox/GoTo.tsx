import { ArrowUpRight, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function GoTo({ link }: { link?: string }) {
  return (
    <Link
      href={link ?? "/support"}
      className="px-2 h-8 flex items-center group hover:border-black justify-center border border-primary-300 rounded-full absolute top-3 right-3 2xl:top-6 2xl:right-6 transition-all duration-200 text-primary-300 hover:text-black"
    >
      {link ? (
        <ArrowUpRight className="cursor-pointer" />
      ) : (
        <>
          <Lightbulb className="cursor-pointer" />
          <p className="hidden md:block">Feedback</p>
        </>
      )}
    </Link>
  );
}
