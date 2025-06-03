import { format } from "date-fns";
import CircularTextTop from "../Svg/CircularTextTop";
import CircularTextBottom from "../Svg/CircularTextBottom";
import { es, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";

export default function CurrentDate({
  background = true,
}: {
  background?: boolean;
}) {
  const today = new Date();
  const locale = useLocale();

  return (
    <div
      id="date-component"
      className={`relative overflow-hidden rounded-3xl flex flex-col justify-center px-4 py-6 mx-3 md:mx-0 transition-all duration-200 ease-out col-span-2 ${
        background && "bg-primary-500 text-white hover:shadow-lg"
      }`}
    >
      <p className="text-4xl capitalize">
        {format(today, "eeee", { locale: locale === "es" ? es : enUS })}
      </p>
      <p className="text-2xl">
        {format(today, "dd MMMM yyyy", { locale: locale === "es" ? es : enUS })}
      </p>
      {background && (
        <>
          <CircularTextTop className="absolute right-0 -top-3" />
          <CircularTextBottom className="absolute right-2 -bottom-2" />
        </>
      )}
    </div>
  );
}
