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
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-72 h-72">
        <circle
          cx="145"
          cy="145"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-gray-100/30"
        />
        <circle
          cx="145"
          cy="145"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-black-100  transition-all duration-300 ease-in-out"
        />
      </svg>
      <div className="absolute text-5xl flex flex-col items-center">
        <span>{`${percent}%`}</span>
        <span className="text-xl">{`${doneCount}/${habits.length}`}</span>
      </div>
    </div>
  );
};

export default CircleProgressBar;
