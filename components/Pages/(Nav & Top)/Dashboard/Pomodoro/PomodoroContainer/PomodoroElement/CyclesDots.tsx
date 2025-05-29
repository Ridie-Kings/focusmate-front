import { useTimerStore } from "@/stores/timerStore";

export default function CyclesDots({ size }: { size: "medium" | "large" }) {
  const { totalCycles, cycles } = useTimerStore();

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
      <p className="text-xs text-gray-300">{totalCycles} Vueltas</p>
    </div>
  );
}
