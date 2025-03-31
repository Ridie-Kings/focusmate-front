import {
  Ellipsis,
  Pause,
  StepForward,
  Play,
  Maximize,
  EllipsisVertical,
} from "lucide-react";

export default function Commands({
  isPlay,
  handleClick,
  fullScreen,
}: {
  handleClick: (action: string) => void;
  isPlay: boolean;
  fullScreen?: boolean;
}) {
  return (
    <ul className="flex items-center justify-center gap-16">
      {[
        {
          id: "openFullScreen",
          icon: fullScreen ? (
            <EllipsisVertical size={fullScreen ? 40 : 32} />
          ) : (
            <Maximize size={fullScreen ? 40 : 32} />
          ),
        },
        {
          id: "togglePlay",
          icon: isPlay ? (
            <Pause
              size={fullScreen ? 40 : 32}
              fill={fullScreen ? "white" : "#014e44"}
            />
          ) : (
            <Play
              size={fullScreen ? 40 : 32}
              fill={fullScreen ? "white" : "#014e44"}
            />
          ),
        },
        {
          id: "reset",
          icon: fullScreen ? (
            <StepForward size={fullScreen ? 40 : 32} />
          ) : (
            <Ellipsis size={fullScreen ? 40 : 32} />
          ),
        },
      ].map(({ id, icon }, index) => (
        <li key={id}>
          <button
            onClick={() => handleClick(id)}
            className={`cursor-pointer ${
              fullScreen
                ? "text-white "
                : " text-primary-green bg-secondary-green/25"
            }  rounded-2xl ${
              [0, 2].includes(index) ? "p-3 2xl:p-4" : "p-7 2xl:p-8"
            }`}
          >
            {icon}
          </button>
        </li>
      ))}
    </ul>
  );
}
