import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageUtils() {
  const router = useRouter();
  const locale = useLocale();
  const nextLocale = locale === "es" ? "en" : "es";

  const handleSwitch = () => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return { handleSwitch };
}
