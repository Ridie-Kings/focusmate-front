"use client";
import { CommandAction, CommandsProps } from "@/interfaces/Pomodoro/Commands";
import { useContext, useState } from "react";
import CommandsHook from "@/hooks/Pomodoro/Commands";
import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
import { TimerContext } from "@/components/Provider/TimerProvider";
import CommandsUtils from "@/lib/Pomodoro/CommandsUtils";

export default function Commands({ fullScreen = false }: CommandsProps) {
  const { isPlay, menu, isType, startedElement } = useContext(TimerContext);
  const { status } = useContext(SocketIOContext);
  const { handleClick } = CommandsUtils();

  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const baseButtonClass = "relative rounded-2xl";
  const activeButtonClass = fullScreen
    ? "text-white"
    : "text-primary-500 bg-secondary-100 cursor-pointer";
  const disabledButtonClass = "bg-gray-400 cursor-not-allowed";

  return (
    <div className="flex flex-col items-center gap-2">
      <ul className="flex items-center place-content-between w-full gap-7 md:gap-6">
        {CommandsHook({
          fullScreen,
          isPlay,
          menu,
          isType,
          status,
          startedElement,
        })
          .filter((button) => button !== undefined)
          .map((button) => (
            <li key={button.id}>
              <button
                onClick={() =>
                  handleClick(button.id as CommandAction, button.disabled)
                }
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
