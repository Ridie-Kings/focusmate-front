import React, { ReactNode, useMemo } from "react";
import RoundedVersion from "./CircleTime/RoundedVersion";

type CircleProgressBarProps = {
  percent: number;
  children: ReactNode;
  rounded?: boolean;
};

const CircleTime: React.FC<CircleProgressBarProps> = ({
  percent,
  children,
  rounded = false,
}) => {
  const safePercent = useMemo(() => {
    return isNaN(percent) ? 100 : Math.min(Math.max(percent, 0), 100);
  }, [percent]);

  const progressDetails = useMemo(() => {
    const radius = 110;
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

  if (rounded) {
    return (
      <RoundedVersion safePercent={safePercent}>{children}</RoundedVersion>
    );
  }

  return (
    <div className="relative flex items-center justify-center text-primary-500">
      <svg
        className="transform -rotate-90 size-62"
        aria-label={`Progress: ${safePercent}%`}
        role="img"
      >
        <circle
          cx="125"
          cy="125"
          r={progressDetails.radius}
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          fill="transparent"
          className="text-secondary-200"
        />

        <circle
          cx="125"
          cy="125"
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

      <div className="absolute flex flex-col items-center gap-4">
        {children}
      </div>
    </div>
  );
};

export default React.memo(CircleTime);
