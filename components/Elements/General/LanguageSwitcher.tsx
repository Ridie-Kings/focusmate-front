"use client";
import LanguageUtils from "@/lib/languageUtils";
import { useLocale } from "next-intl";

export default function LanguageSwitcher({ darkMode }: { darkMode?: boolean }) {
  const locale = useLocale();
  const { handleSwitch } = LanguageUtils();

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
