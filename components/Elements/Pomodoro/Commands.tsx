import { PomodoroStatus } from "@/components/Provider/WebsocketProvider";
import { chipsIconType } from "@/components/Reusable/Chips";
import {
  RefreshCw,
  Pause,
  StepForward,
  Play,
  Maximize,
  EllipsisVertical,
} from "lucide-react";
import { useState } from "react";

type CommandAction = "togglePlay" | "reset" | "share" | "openFullScreen";

type CommandsProps = {
  isPlay: boolean;
  handleClick: (action: CommandAction) => void;
  fullScreen?: boolean;
  menu: chipsIconType;
  status: PomodoroStatus | null;
};

type CommandButton = {
  id: CommandAction;
  icon: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export default function Commands({
  isPlay,
  handleClick,
  fullScreen = false,
  menu,
  status,
}: CommandsProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const iconSize = fullScreen ? 40 : 32;

  const baseButtonClass = "relative rounded-2xl";
  const activeButtonClass = fullScreen
    ? "text-white"
    : "text-primary-500 bg-secondary-700/25 cursor-pointer";
  const disabledButtonClass = "bg-gray-400 cursor-not-allowed";
  const primaryButtonPadding = "p-7 2xl:p-8";
  const secondaryButtonPadding = "p-3 2xl:p-4";

  const commandButtons: CommandButton[] = [
    {
      id: "openFullScreen",
      icon: fullScreen ? (
        <EllipsisVertical
          size={iconSize}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ) : (
        <Maximize size={iconSize} className="text-gray-100" />
      ),
      disabled: true,
      className: secondaryButtonPadding,
    },
    {
      id: "togglePlay",
      icon: isPlay ? (
        <Pause
          size={iconSize}
          fill={fullScreen ? "white" : "#014e44"}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ) : (
        <Play
          size={iconSize}
          fill={fullScreen ? "white" : "#014e44"}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ),
      disabled: menu === "D/Corto" && !status?.active,
      className: primaryButtonPadding,
    },
    {
      id: "reset",
      icon: fullScreen ? (
        <StepForward
          size={iconSize}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ) : (
        <RefreshCw
          size={iconSize}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ),
      disabled: menu === "D/Corto" && !status?.active,
      className: secondaryButtonPadding,
    },
  ];

  const handleButtonClick = (action: CommandAction, disabled?: boolean) => {
    if (!disabled) {
      handleClick(action);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <ul className="flex items-center justify-center gap-7 md:gap-16">
        {commandButtons.map((button) => (
          <li key={button.id}>
            <button
              onClick={() => handleButtonClick(button.id, button.disabled)}
              onMouseEnter={() =>
                button.id === "openFullScreen" && setShowTooltip(true)
              }
              onMouseLeave={() =>
                button.id === "openFullScreen" && setShowTooltip(false)
              }
              className={`
                ${baseButtonClass}
                ${button.disabled ? disabledButtonClass : activeButtonClass}
                ${button.className || ""}
                group hover:scale-95 scale-100 transition-all duration-300
              `}
              aria-label={button.id}
              disabled={button.disabled}
            >
              {button.icon}
              {showTooltip && button.id === "openFullScreen" && (
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
