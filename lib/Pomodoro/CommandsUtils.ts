import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
import { useCallback, useContext } from "react";
import { timeUtils } from "@/components/Provider/TimerProvider/TimeUtils";
import { TimerContext } from "@/components/Provider/TimerProvider";

export default function CommandsUtils() {
  const { status, startPomodoro, stopPomodoro, pausePomodoro, resumePomodoro } =
    useContext(SocketIOContext);
  const { time, isPlay, togglePlay, resetTimer, setIsOpen, isChronometer } =
    useContext(TimerContext);

  const handleClick = useCallback(
    (action: string, disabled?: boolean) => {
      if (disabled) return;
      switch (action) {
        case "openFullScreen":
          setIsOpen(true);
          break;

        case "togglePlay":
          if (!isChronometer) {
            if (!status?.active) {
              startPomodoro(timeUtils.timeToSeconds(time));
            } else if (!status.isPaused) {
              pausePomodoro();
            } else if (status.isPaused) {
              resumePomodoro();
            }
          }

          togglePlay();
          break;

        case "reset":
          if (status?.active && status?.pomodoroId && !isChronometer)
            stopPomodoro(status.pomodoroId);
          resetTimer();
          break;

        default:
          break;
      }
    },
    [
      isChronometer,
      status,
      time,
      startPomodoro,
      pausePomodoro,
      resumePomodoro,
      stopPomodoro,
      setIsOpen,
      togglePlay,
      resetTimer,
    ]
  );
  return { handleClick };
}
