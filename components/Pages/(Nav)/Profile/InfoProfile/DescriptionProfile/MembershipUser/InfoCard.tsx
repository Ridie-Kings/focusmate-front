import Button from "@/components/Reusable/Button";
// import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col justify-end items-end gap-4">
      <p className="py-4 border-b border-primary-200 w-full text-center">
        {title}
      </p>
      <div className="flex-1 gap-4 flex flex-col w-full justify-center">
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
      <Button
        onClick={() => router.push(url.url)}
        button="primary"
        type="button"
        size="compact"
      >
        {url.label}
      </Button>
    </div>
  );
}
