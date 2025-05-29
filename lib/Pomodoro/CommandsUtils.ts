import { useCallback } from "react";
import { useWebSocketStore } from "@/stores/websocketStore";
import { useTimerStore } from "@/stores/timerStore";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";

import { StartDefaultPomodoro } from "@/services/Pomodoro/StartDefaultPomodoro";
import { PausePomodoro } from "@/services/Pomodoro/PausePomodoro";
import { ResumePomodoro } from "@/services/Pomodoro/ResumePomodoro";
import { StopPomodoro } from "@/services/Pomodoro/StopPomodoro";
import { CommandAction } from "@/interfaces/Pomodoro/Commands";
import { StartPomodoroById } from "@/services/Pomodoro/StartPomodoroById";

export default function CommandsUtils() {
  const { status, handleJoinPomodoro } = useWebSocketStore();
  const {
    togglePlay,
    resetTimer,
    setStartedElement,
    isChronometer,
    startedElement,
  } = useTimerStore();
  const { setIsOpen } = useModalStore();
  const { addToast } = useToastStore();

  const handleClick = useCallback(
    async (action: CommandAction) => {
      if (isChronometer) {
        if (action === "togglePlay") {
          togglePlay();
        } else if (action === "reset") {
          resetTimer();
        }
        return;
      }

      if (!status) {
        if (action === "togglePlay") {
          console.log("START DEFAULT POMODORO");
          const response = await StartDefaultPomodoro();

          if (response.success) {
            handleJoinPomodoro(response.res._id);
            setStartedElement(true);
            togglePlay();
          } else {
            addToast({
              type: "error",
              message: "Error al iniciar el pomodoro",
            });
          }
        } else if (action === "settings") {
          setIsOpen({ text: "pomodoroSettings" });
        }
        return;
      }

      if (!startedElement && action === "togglePlay") {
        console.log("START POMODORO BY ID");

        const response = await StartPomodoroById({ id: status._id });

        if (response.success) {
          setStartedElement(true);
          togglePlay();
        } else {
          addToast({
            type: "error",
            message: "Error al iniciar el pomodoro",
          });
        }

        return;
      }

      if (action === "togglePlay") {
        console.log("TOGGLE PLAY");

        if (status.pausedState === "paused") {
          console.log("RESUME POMODORO");
          const response = await ResumePomodoro({ id: status._id });
          if (response.success) {
            togglePlay();
          } else {
            addToast({
              type: "error",
              message: "Error al reanudar el pomodoro",
            });
          }
        } else {
          console.log("PAUSE POMODORO");

          const response = await PausePomodoro({ id: status._id });
          if (response.success) {
            togglePlay();
          } else {
            addToast({
              type: "error",
              message: "Error al pausar el pomodoro",
            });
          }
        }
      } else if (action === "reset") {
        const response = await StopPomodoro({ id: status._id });
        if (response.success) {
          resetTimer();
          setStartedElement(false);
          setIsOpen({ text: "" });
        } else {
          addToast({
            type: "error",
            message: "Error al detener el pomodoro",
          });
        }
      } else if (action === "settings") {
        setIsOpen({ text: "pomodoroSettings", other: status });
      }
    },
    [
      status,
      isChronometer,
      togglePlay,
      resetTimer,
      handleJoinPomodoro,
      setStartedElement,
      setIsOpen,
      addToast,
    ]
  );

  return { handleClick };
}
