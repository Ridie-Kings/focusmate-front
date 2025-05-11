import { PomodoroStatus } from "@/components/Provider/WebsocketProvider";
import { chipsIconType } from "@/components/Reusable/Chips";
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
}: {
  fullScreen: boolean;
  isPlay: boolean;
  menu: chipsIconType;
  status: PomodoroStatus | null;
  isType: "cronometro" | "temporizador" | "pomodoro";
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
      disabled: menu === "D/Corto" && !status?.active,
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
      // disabled: menu === "D/Corto" && !status?.active,
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
      disabled: true,
      // disabled: menu === "D/Corto" && !status?.active,
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
