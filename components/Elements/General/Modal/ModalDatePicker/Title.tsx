import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";

export default function Title({ date }: { date: Date | undefined }) {
  const t = useTranslations("Common");
  const locale = useLocale();

  return (
    <div className="p-4 flex flex-col gap-2 border-b border-primary-200">
      <p className="text-sm text-gray-500">{t("selectDate")}</p>
      <p className="text-2xl text-black">
        {format(date ?? new Date(), "dd MMMM yyyy", {
          locale: locale === "es" ? es : enUS,
        })}
      </p>
    </div>
  );
}
