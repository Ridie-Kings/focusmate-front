import { useCallback, useContext } from "react";

import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
import { TimerContext } from "@/components/Provider/TimerProvider";
import { ModalContext } from "@/components/Provider/ModalProvider";

import { StartPomodoroById } from "@/services/Pomodoro/StartPomodoroById";
import { StartDefaultPomodoro } from "@/services/Pomodoro/StartDefaultPomodoro";
import { PausePomodoro } from "@/services/Pomodoro/PausePomodoro";
import { ResumePomodoro } from "@/services/Pomodoro/ResumePomodoro";
import { StopPomodoro } from "@/services/Pomodoro/StopPomodoro";
import { useToast } from "@/components/Provider/ToastProvider";

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
  const { addToast } = useToast();

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
            console.log("CLICK 1");

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
              const res = await (isPlay
                ? PausePomodoro({ id: status._id })
                : ResumePomodoro({ id: status._id }));

              console.log(res.res);
            } catch (error) {
              console.error(
                `Error al ${isPlay ? "pausar" : "reanudar"} pomodoro:`,
                error
              );
            }
          }
          break;

        case "reset":
          if (!isChronometer && status?._id) {
            try {
              const res = await StopPomodoro({ id: status._id });
              console.log(res);
              
              if (!res.success) {
                addToast({
                  message: res.res as string,
                  type: "error",
                });
              }
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
