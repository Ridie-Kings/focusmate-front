import {
  RefreshCw,
  Pause,
  StepForward,
  Play,
  Maximize,
  EllipsisVertical,
  Share2,
} from "lucide-react";
import { useState } from "react";

export default function Commands({
  isPlay,
  handleClick,
  fullScreen,
  isConnected,
}: {
  handleClick: (action: string) => void;
  isPlay: boolean;
  fullScreen?: boolean;
  isConnected?: boolean;
}) {
  const [showMsg, setShowMsg] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-2">
      {isConnected !== undefined && (
        <div className="text-xs mb-2">
          {isConnected ? (
            <div className="text-green-500 flex items-center gap-1">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              Conectado
            </div>
          ) : (
            <div className="text-amber-500 flex items-center gap-1">
              <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
              Modo local
            </div>
          )}
        </div>
      )}
      
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
          ...(isConnected ? [
            {
              id: "share",
              icon: <Share2 size={fullScreen ? 40 : 32} className={fullScreen ? "text-white" : "text-primary-500"} />,
            },
          ] : []),
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
              } ${[0, 2, 3].includes(index) ? "p-3 2xl:p-4" : "p-7 2xl:p-8"}`}
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
    </div>
  );
}