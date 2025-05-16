import { useCallback, useContext } from "react";

import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
import { TimerContext } from "@/components/Provider/TimerProvider";
import { ModalContext } from "@/components/Provider/ModalProvider";

import { StartPomodoroById } from "@/services/Pomodoro/StartPomodoroById";
import { StartDefaultPomodoro } from "@/services/Pomodoro/StartDefaultPomodoro";
import { PausePomodoro } from "@/services/Pomodoro/PausePomodoro";
import { ResumePomodoro } from "@/services/Pomodoro/ResumePomodoro";
import { StopPomodoro } from "@/services/Pomodoro/StopPomodoro";

export default function CommandsUtils() {
  const { status, handleJoinPomodoro } = useContext(SocketIOContext);
  const {
    togglePlay,
    resetTimer,
    isPlay,
    startedElement,
    setStartedElement,
    isChronometer,
  } = useContext(TimerContext);
  const { setIsOpen } = useContext(ModalContext);

  const handleClick = useCallback(
    async (action: string, disabled?: boolean) => {
      if (disabled) return;

      switch (action) {
        case "togglePlay":
          if (isChronometer) {
            togglePlay();
            return;
          }

          if (!startedElement) {
            try {
              const res = await (status
                ? StartPomodoroById({ id: status._id })
                : StartDefaultPomodoro());

              if (res.success) {
                handleJoinPomodoro(res.res._id);
                if (!status) setStartedElement(true);
              }
            } catch (error) {
              console.error("Error al iniciar pomodoro:", error);
            }
          } else if (status) {
            try {
              await (isPlay
                ? PausePomodoro({ id: status._id })
                : ResumePomodoro({ id: status._id }));
            } catch (error) {
              console.error(
                `Error al ${isPlay ? "pausar" : "reanudar"} pomodoro:`,
                error
              );
            }
          }

          togglePlay();
          break;

        case "reset":
          if (!isChronometer && status?._id) {
            try {
              await StopPomodoro({ id: status._id });
            } catch (error) {
              console.error("Error al detener pomodoro:", error);
            }
          }
          resetTimer();
          break;

        case "settings":
          setIsOpen({
            text: "pomodoroSettings",
            other: status,
          });
          break;
      }
    },
    [
      status,
      togglePlay,
      resetTimer,
      isPlay,
      startedElement,
      handleJoinPomodoro,
      setStartedElement,
      isChronometer,
      setIsOpen,
    ]
  );

  return { handleClick };
}
