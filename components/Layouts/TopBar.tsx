"use client";
import PageTitle from "./TopBar/PageTitle";
import Image from "next/image";
import Link from "next/link";
import { UseScrollDirection } from "@/hooks/UseScrollDirection";
import { useTranslations } from "next-intl";
import { useProfile } from "@/stores/profileStore";

export default function TopBar() {
  const t = useTranslations("HomePage");
  const { isVisible } = UseScrollDirection();
  const profile = useProfile();

  return (
    <header
      className={`sticky top-0 left-0 right-0 flex place-content-between pr-15 py-2 px-6 sm:p-6 w-full border-b border-primary-200 bg-white z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col sm:flex-1 justify-center">
        <p className="sm:text-lg hidden sm:block text-primary-500 capitalize">
          {t("title", { name: profile?.user?.fullname ?? "" })}
        </p>
        <PageTitle />
      </div>
      <div className="flex items-end justify-end gap-3">
        {/* <Search
          size={36}
          className="border border-secondary-700 cursor-pointer rounded-full bg-secondary-100 text-secondary-700 p-2"
        />
        <Notification /> */}
        <Link
          href={"/profile"}
          className="overflow-hidden rounded-full flex items-center justify-center cursor-pointer size-9"
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
