import { chipsIconType } from "@/components/Reusable/Chips";
import { PomodoroStatus } from "@/interfaces/websocket/WebSocketProvider";
import {
  EllipsisVertical,
  Maximize,
  Pause,
  Play,
  RefreshCw,
  Settings,
  SkipForward,
  StepForward,
} from "lucide-react";

export default function CommandsHook({
  fullScreen,
  isPlay,
  menu,
  isType,
  status,
  startedElement,
}: {
  fullScreen: boolean;
  isPlay: boolean;
  menu: chipsIconType;
  status: PomodoroStatus | null;
  isType: "cronometro" | "temporizador" | "pomodoro";
  startedElement: boolean;
}) {
  const iconSize = fullScreen ? 40 : 32;
  const primaryButtonPadding = "p-7 2xl:p-8";
  const secondaryButtonPadding = "p-3 2xl:p-4";

  const commands = [
    {
      id: "openFullScreen",
      icon: fullScreen ? (
        <EllipsisVertical
          size={iconSize}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ) : (
        <Maximize size={iconSize} />
      ),
      disabled: true,
      className: secondaryButtonPadding,
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
      disabled:
        status?.state === "idle" || status?.state === "working" ? false : true,
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
      disabled: false,
      className: primaryButtonPadding,
    },
    {
      id: "skip",
      icon: fullScreen ? (
        <StepForward
          size={iconSize}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ) : (
        <SkipForward
          size={iconSize}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ),
      disabled: true,
      className: secondaryButtonPadding,
    },
    {
      id: "settings",
      icon: fullScreen ? (
        <Settings
          size={iconSize}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ) : (
        <Settings
          size={iconSize}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ),
      disabled: startedElement ? true : false,
      className: secondaryButtonPadding,
    },
  ];

  if (isType === "cronometro") {
    const filteredCommands = commands.filter(
      (command) => !["skip", "settings"].includes(command.id)
    );

    return [
      filteredCommands.find((c) => c.id === "openFullScreen"),
      filteredCommands.find((c) => c.id === "togglePlay"),
      filteredCommands.find((c) => c.id === "reset"),
    ].filter(Boolean);
  }

  return commands;
}
