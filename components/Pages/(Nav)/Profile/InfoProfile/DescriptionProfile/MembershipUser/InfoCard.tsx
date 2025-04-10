import { label } from "motion/react-client";
import Link from "next/link";
import { ReactNode } from "react";

export default function InfoCard({
  title,
  items,
  url,
}: {
  title: string;
  items: { label: string; icon: ReactNode; subText?: string }[];
  url: { label: string; url: string };
}) {
  return (
    <div className="flex-1 flex flex-col items-end gap-4">
      <p className="py-4 border-b border-primary-200 w-full text-center">
        {title}
      </p>
      <div className="h-28 gap-4 flex flex-col w-full justify-center">
        {items.map((item) => (
          <div key={item.label} className="flex gap-4 px-4">
            {item.icon}
            <p className="flex flex-col">
              {item.label}{" "}
              {item.subText && (
                <span className="text-sm text-gray-400">{item.subText}</span>
              )}
            </p>
          </div>
        ))}
      </div>
      <Link href={url.url} className="text-sm text-primary-500">
        {url.label}
      </Link>
    </div>
  );
}
