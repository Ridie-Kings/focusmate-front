import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const StreaksBg1 = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksBg1")
);
const StreaksBg2 = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksBg2")
);
const StreaksBg3 = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksBg3")
);
const StreaksBgMax = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksBgMax")
);
const StreaksNull = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksNull")
);

export default function Streaks({ number }: { number: number }) {
  const t = useTranslations("Dashboard.streaks");

  const text = (): { title: string; desc: string } => {
    switch (number) {
      case 0:
        return {
          title: t("levels.level0.title"),
          desc: t("levels.level0.description"),
        };
      default:
        if (number >= 1 && number < 3)
          return {
            title: t("levels.level1.title"),
            desc: t("levels.level1.description"),
          };
        if (number >= 3 && number < 15) {
          return {
            title: t("levels.level2.title"),
            desc: t("levels.level2.description"),
          };
        }
        if (number >= 15 && number < 30)
          return {
            title: t("levels.level3.title"),
            desc: t("levels.level3.description"),
          };
        if (number >= 30)
          return {
            title: t("levels.level4.title"),
            desc: t("levels.level4.description"),
          };
        return {
          title: "",
          desc: "",
        };
    }
  };

  return (
    <TemplateDashboard
      title=""
      grid={`text-base items-start mx-3 md:mx-0 col-span-2 ${
        number <= 0
          ? "bg-quaternary-700 text-white"
          : "bg-secondary-100 text-primary-700"
      }`}
      link=""
      id="streaks-component"
    >
      <div className="w-full z-20">
        <p className=" text-xl font-semibold">{text().title}</p>
        <p className="text-xs text-secondary-700">{text().desc}</p>
      </div>
      <p className="p-2 text-sm bg-secondary-600 z-10 rounded-sm text-white">
        {number} {number <= 1 ? t("days.single") : t("days.multiple")}
      </p>
      {number === 0 ? (
        <StreaksNull />
      ) : number >= 1 && number < 3 ? (
        <StreaksBg1 />
      ) : number >= 3 && number < 15 ? (
        <StreaksBg2 />
      ) : number >= 15 && number < 30 ? (
        <StreaksBg3 />
      ) : (
        number >= 30 && <StreaksBgMax />
      )}
    </TemplateDashboard>
  );
}
