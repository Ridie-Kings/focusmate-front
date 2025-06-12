import { useEffect, useState } from "react";

export default function RoundedVersion({
  children,
  safePercent,
}: {
  children: React.ReactNode;
  safePercent: number;
}) {
  const strokeWidth = 15;
  const [currentSize, setCurrentSize] = useState({ x: 0, y: 0 });
  const sizes = {
    sm: { x: 250, y: 300 },
    md: { x: 250, y: 300 },
    lg: { x: 225, y: 340 },
    xl: { x: 275, y: 450 },
    "2xl": { x: 450, y: 600 },
  };

  const getCurrentSize = () => {
    if (typeof window === "undefined") return sizes.md;

    const width = window.innerWidth;
    if (width >= 1536) return sizes["2xl"];
    if (width >= 1280) return sizes.xl;
    if (width >= 1024) return sizes.lg;
    if (width >= 768) return sizes.md;
    return sizes.sm;
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentSize(getCurrentSize());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const perimeter = 2 * (currentSize.x + currentSize.y - 2 * strokeWidth);
  const strokeDashoffset = perimeter - (safePercent / 100) * perimeter;

  return (
    <div
      className="relative flex items-center gap-2 justify-center text-primary-500"
      style={{
        width: currentSize.x,
        height: currentSize.y,
      }}
    >
      <svg
        className="transform -rotate-90 w-full h-full"
        style={{
          width: currentSize.x,
          height: currentSize.y,
        }}
        aria-label={`Progress: ${safePercent}%`}
        role="img"
        viewBox={`0 0 ${currentSize.x} ${currentSize.y}`}
      >
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={currentSize.x - strokeWidth}
          height={currentSize.y - strokeWidth}
          rx="50"
          ry="50"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          className="text-secondary-200"
        />
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={currentSize.x - strokeWidth}
          height={currentSize.y - strokeWidth}
          rx="50"
          ry="50"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={perimeter}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-in-out text-secondary-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center gap-4 2xl:gap-8">
        {children}
      </div>
    </div>
  );
}
