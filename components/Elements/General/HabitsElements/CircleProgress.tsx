import React, { useMemo } from "react";
import { itemsType } from "@/components/Pages/Habits";

type CircleProgressBarProps = {
  percent: number;
  doneCount: number;
  habits: itemsType[];
};

const CircleProgressBar: React.FC<CircleProgressBarProps> = ({
  percent,
  doneCount,
  habits,
}) => {
  // Memoize calculations to prevent unnecessary re-renders
  const progressDetails = useMemo(() => {
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percent / 100) * circumference;
    const angle = (percent / 100) * 360;

    return {
      radius,
      circumference,
      strokeDashoffset,
      angle,
    };
  }, [percent]);

  // Ensure percent is between 0 and 100
  const safePercent = Math.min(Math.max(percent, 0), 100);

  return (
    <div className="relative flex items-center justify-center text-primary-green">
      <svg
        className="transform -rotate-90 w-72 h-72"
        aria-label={`Progress: ${safePercent}%`}
        role="img"
      >
        {/* Background circle avec extrémités arrondies */}
        <circle
          cx="145"
          cy="145"
          r={progressDetails.radius}
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          fill="transparent"
          className="text-gray-100/30"
        />

        {/* Progress circle avec extrémités arrondies */}
        <circle
          cx="145"
          cy="145"
          r={progressDetails.radius}
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={progressDetails.circumference}
          strokeDashoffset={progressDetails.strokeDashoffset}
          className="transition-all duration-300 ease-in-out text-primary-green"
        />
      </svg>

      {/* Texte centré */}
      <div className="absolute flex flex-col items-center gap-1 text-center">
        <p className="flex items-center text-5xl">
          <span key={safePercent} className="animate-opacStart">
            {safePercent}
          </span>
          <span className="ml-1">%</span>
        </p>
        <p className="flex items-center">
          <span key={doneCount} className="animate-opacStart">
            {doneCount}
          </span>
          <span className="ml-1">/ {habits.length}</span>
        </p>
      </div>
    </div>
  );
};

export default React.memo(CircleProgressBar);
