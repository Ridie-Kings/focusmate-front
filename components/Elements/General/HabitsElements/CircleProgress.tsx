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

  const angle = (percent / 100) * 360;

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
          className="text-black-100 transition-all duration-300 ease-in-out"
        />

        <g
          transform={`rotate(${angle} 145 145)`}
          className="transition-all duration-300 ease-in-out"
        >
          <circle cx="245" cy="145" r="10" fill="black" />
        </g>
      </svg>

      <div className="absolute text-5xl flex flex-col items-center ">
        <p className="flex">
          <span key={percent} className="animate-opacStart">
            {percent}
          </span>{" "}
          %
        </p>
        <p className="text-xl flex">
          <span key={percent} className="animate-opacStart">
            {doneCount}
          </span>
          /{habits.length}
        </p>
      </div>
    </div>
  );
};

export default CircleProgressBar;
