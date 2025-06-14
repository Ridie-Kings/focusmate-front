"use client";
import PageTitle from "./TopBar/PageTitle";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useProfile } from "@/stores/profileStore";

export default function TopBar() {
  const t = useTranslations("HomePage");
  const profile = useProfile();

  return (
    <header className="fixed top-0 right-0 flex place-content-between pr-15 py-2 px-6 sm:p-6 sm:pr-12.5 w-[calc(100%-88px)] border-b border-primary-200/25 drop-shadow-2xl bg-white/40 backdrop-blur-lg z-50 transition-all duration-300 -translate-y-[85%] opacity-0 hover:opacity-100 hover:translate-y-0 group">
      <div className="flex flex-col sm:flex-1 justify-center">
        <p className="sm:text-lg hidden sm:block text-primary-700 capitalize -translate-y-5 group-hover:translate-0 transition-all duration-700">
          {t("title", { name: profile?.user?.fullname ?? "" })}
        </p>
        <PageTitle />
      </div>
      <div className="flex items-center justify-end gap-3">
        {/* <Search
          size={36}
          className="border border-secondary-700 cursor-pointer rounded-full bg-secondary-100 text-secondary-700 p-2"
        />
        <Notification /> */}
        <Link
          href={"/profile"}
          className="overflow-hidden rounded-full flex items-center justify-center cursor-pointer size-10"
        >
          <Image
            src={
              profile && profile?.avatar !== ""
                ? profile?.avatar
                : "/images/errors/errorImage.png"
            }
            width={36}
            height={36}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
