"use client";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { Gem } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function PlanButtons({
  profile,
}: {
  profile: ProfileType | null;
}) {
  const router = useRouter();
  const t = useTranslations("navBar");

  const handleSend = async () => {
    try {
      await fetch("/api/send-previnterest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: profile?.user._id,
          email: profile?.user.email,
        }),
      });
    } catch (err) {
      console.log(err);
    } finally {
      router.push("pricing");
    }
  };
  return (
    <div
      onClick={() => handleSend()}
      className="group relative flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-secondary-500 hover:bg-secondary-400 text-gray-300 cursor-pointer transition-all duration-300 md:group-hover:w-full md:w-11 w-full"
      aria-label="Mejorar Plan"
    >
      <span className="font-medium text-white whitespace-nowrap transition-all duration-300 overflow-hidden md:max-w-0 group-hover:max-w-xs md:opacity-0 md:group-hover:opacity-100">
        {t("plan")}
      </span>

      <span className="text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
        <Gem size={20} />
      </span>

      <span className="absolute right-3 text-white transition-all duration-300 md:opacity-100 group-hover:opacity-0">
        <Gem size={20} />
      </span>
    </div>
  );
}
