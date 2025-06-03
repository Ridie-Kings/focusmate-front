"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher({ darkMode }: { darkMode: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const nextLocale = locale === "es" ? "en" : "es";

  const handleSwitch = () => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <button
      onClick={handleSwitch}
      className={`mt-4 px-3 py-1 rounded  transition cursor-pointer ${
        darkMode
          ? "bg-primary-500/10 text-primary-500 hover:bg-primary-500/20"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
