import { HabitsType } from "@/interfaces/Habits/HabitsType";
import React, { useMemo } from "react";

type CircleProgressBarProps = {
  percent: number;
  doneCount: number;
  habits: HabitsType[];
};

const CircleProgressBar: React.FC<CircleProgressBarProps> = ({
  percent,
  doneCount,
  habits,
}) => {
  const safePercent = useMemo(() => {
    return isNaN(percent) ? 100 : Math.min(Math.max(percent, 0), 100);
  }, [percent]);

  const progressDetails = useMemo(() => {
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (safePercent / 100) * circumference;
    const angle = (safePercent / 100) * 360;

    return {
      radius,
      circumference,
      strokeDashoffset,
      angle,
    };
  }, [safePercent]);

  return (
    <div className="relative flex items-center justify-center text-primary-500">
      <svg
        className="transform -rotate-90 w-72 h-72"
        aria-label={`Progress: ${safePercent}%`}
        role="img"
      >
        <circle
          cx="145"
          cy="145"
          r={progressDetails.radius}
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          fill="transparent"
          className="text-secondary-200"
        />

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
          className="transition-all duration-300 ease-in-out text-secondary-700"
        />
      </svg>

      <div className="absolute flex flex-col items-center gap-1 text-center">
        <p className="flex items-center text-5xl">
          <span key={safePercent} className="animate-opacStart">
            {isNaN(safePercent) ? 100 : safePercent}
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
