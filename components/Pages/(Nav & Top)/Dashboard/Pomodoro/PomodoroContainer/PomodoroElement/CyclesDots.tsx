import { useCycles, useTotalCycles } from "@/stores/timerStore";
import { useTranslations } from "next-intl";

export default function CyclesDots({
  size,
}: {
  size: "small" | "medium" | "large";
}) {
  const totalCycles = useTotalCycles();
  const cycles = useCycles();
  const t = useTranslations("Dashboard.pomodoro");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {totalCycles
          ? Array.from({ length: totalCycles }, (_, index) => (
              <span key={index}>
                {totalCycles - cycles > index ? (
                  <div
                    key={index}
                    className={`${
                      size === "large" ? "size-2.5 2xl:size-4" : "size-2"
                    } rounded-full bg-secondary-700`}
                  />
                ) : (
                  <div
                    key={index}
                    className={`${
                      size === "large" ? "size-2.5 2xl:size-4" : "size-2"
                    } rounded-full bg-secondary-500`}
                  />
                )}
              </span>
            )).reverse()
          : ""}
      </div>
      <p className="text-xs text-gray-400">
        {totalCycles} {t("cycles")}
      </p>
    </div>
  );
}
