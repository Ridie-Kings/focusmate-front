import { chipsIconType } from "@/components/Reusable/Chips";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
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
  status: PomodoroStatusType | null;
  isType: "cronometro" | "temporizador" | "pomodoro";
  startedElement: boolean;
}) {
  const iconSize = fullScreen ? 40 : 32;
  const primaryButtonPadding =
    "sm:p-3 2xl:p-8 flex items-center justify-center";
  const secondaryButtonPadding =
    "sm:p-3 2xl:p-4 flex items-center justify-center";

  const commands = [
    {
      id: "openFullScreen",
      icon: fullScreen ? (
        <EllipsisVertical
          size={iconSize}
          className="group-hover:scale-110 scale-100 transition-all duration-300"
        />
      ) : (
        <Maximize />
      ),
      disabled: true,
      className: secondaryButtonPadding,
    },
    {
      id: "reset",
      icon: fullScreen ? (
        <StepForward
          className={` group-hover:scale-110 scale-100 transition-all duration-300`}
        />
      ) : (
        <RefreshCw
          className={` group-hover:scale-110 scale-100 transition-all duration-300`}
        />
      ),
      disabled:
        status?.state === "idle" ||
        status?.state === "working" ||
        status?.state === "longBreak" ||
        status?.state === "shortBreak"
          ? false
          : true,
      className: secondaryButtonPadding,
    },
    {
      id: "togglePlay",
      icon: isPlay ? (
        <Pause
          className={` group-hover:scale-110 scale-100 transition-all duration-300`}
          fill={fullScreen ? "white" : "#014e44"}
        />
      ) : (
        <Play
          className={` group-hover:scale-110 scale-100 transition-all duration-300`}
          fill={fullScreen ? "white" : "#014e44"}
        />
      ),
      disabled: false,
      className: primaryButtonPadding,
    },
    {
      id: "skip",
      icon: fullScreen ? (
        <StepForward
          className={` group-hover:scale-110 scale-100 transition-all duration-300`}
        />
      ) : (
        <SkipForward
          className={`${
            fullScreen ? "size-8" : "size-6 sm:size-20"
          } group-hover:scale-110 scale-100 transition-all duration-300`}
        />
      ),
      disabled: true,
      className: secondaryButtonPadding,
    },
    {
      id: "settings",
      icon: fullScreen ? (
        <Settings
          className={` group-hover:scale-110 scale-100 transition-all duration-300`}
        />
      ) : (
        <Settings
          className={` group-hover:scale-110 scale-100 transition-all duration-300`}
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
  if (startedElement) {
    const filteredCommands = commands.filter(
      (command) => !["togglePlay"].includes(command.id)
    );
    return [
      filteredCommands.find((c) => c.id === "openFullScreen"),
      filteredCommands.find((c) => c.id === "reset"),
      filteredCommands.find((c) => c.id === "skip"),
      filteredCommands.find((c) => c.id === "settings"),
    ].filter(Boolean);
  }

  return commands;
}
