export default function TimeLeftBar({
  length,
  divider,
  calc,
}: {
  length: number;
  divider: number;
  calc: number;
}) {
  return (
    <div className="flex flex-col gap-5 relative">
      <div className="h-full flex flex-col gap-10 text-sm text-gray-600 relative">
        {Array.from({ length: length }, (_, i) => {
          const hours = Math.floor(i / divider);
          let minutes = 0;

          if (calc === 1) minutes = i % 2 === 0 ? 0 : 30;
          else if (calc === 2) minutes = (i % 4) * 15;

          return (
            <div key={i} className="relative flex items-center">
              <div className="flex-1 sm:px-7 text-center text-lg cursor-pointer">
                {`${hours.toString().padStart(2, "0")}:${minutes
                  .toString()
                  .padStart(2, "0")}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
