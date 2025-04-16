import {
  RefreshCw,
  Pause,
  StepForward,
  Play,
  Maximize,
  EllipsisVertical,
} from "lucide-react";
import { useState } from "react";

export default function Commands({
  isPlay,
  handleClick,
  fullScreen,
}: {
  handleClick: (action: string) => void;
  isPlay: boolean;
  fullScreen?: boolean;
}) {
  const [showMsg, setShowMsg] = useState<boolean>(false);

  return (
    <ul className="flex items-center justify-center gap-16">
      {[
        {
          id: "openFullScreen",
          icon: fullScreen ? (
            <EllipsisVertical size={fullScreen ? 40 : 32} />
          ) : (
            <Maximize size={fullScreen ? 40 : 32} className="text-gray-100" />
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
            <RefreshCw size={fullScreen ? 40 : 32} />
          ),
        },
      ].map(({ id, icon }, index) => (
        <li key={id}>
          <button
            onClick={() => id !== "openFullScreen" && handleClick(id)}
            onMouseEnter={() => id === "openFullScreen" && setShowMsg(true)}
            onMouseLeave={() => id === "openFullScreen" && setShowMsg(false)}
            className={`relative rounded-2xl ${
              fullScreen
                ? "text-white"
                : id === "openFullScreen"
                ? "bg-gray-400 cursor-not-allowed"
                : " text-primary-500 bg-secondary-700/25 cursor-pointer"
            } ${[0, 2].includes(index) ? "p-3 2xl:p-4" : "p-7 2xl:p-8"}`}
          >
            {icon}
            {showMsg && id === "openFullScreen" && (
              <div className="absolute left-15 drop-shadow-lg top-0 rounded z-50 bg-background-primary px-2 py-4">
                Proximamente
              </div>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
