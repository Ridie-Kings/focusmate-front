import { ArrowUpRight, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function GoTo({ link }: { link?: string }) {
  return (
    <Link
      href={link ?? "/support"}
      className="px-2 h-8 flex items-center group hover:border-black justify-center border border-primary-300 rounded-full absolute top-2 right-3 transition-all duration-200 text-primary-300 hover:text-black"
    >
      {link ? (
        <ArrowUpRight className="cursor-pointer" />
      ) : (
        <>
          <Lightbulb className="cursor-pointer" />
          <p>Feedback</p>
        </>
      )}
    </Link>
  );
}
