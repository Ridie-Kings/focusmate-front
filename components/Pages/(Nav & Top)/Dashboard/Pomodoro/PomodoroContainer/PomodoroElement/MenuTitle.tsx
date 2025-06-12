import { useTranslations } from "next-intl";

export default function MenuTitle({
  size,
  menu,
}: {
  size: "small" | "medium" | "large";
  menu: string;
}) {
  const t = useTranslations("Dashboard.pomodoro.menu");

  return (
    <p
      className={`capitalize bg-secondary-200 rounded-full px-1 cursor-default transition-all duration-300 ${
        size === "large"
          ? "text-xl 2xl:text-3xl px-3"
          : "text-sm hover:scale-105"
      }`}
    >
      {t(menu.toLocaleLowerCase())}
    </p>
  );
}
