import { useCallback } from "react";
import { useStatus, useWebSocketStore } from "@/stores/websocketStore";
import {
  useIsChronometer,
  useStartedElement,
  useTimerStore,
} from "@/stores/timerStore";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";

import { StartDefaultPomodoro } from "@/services/Pomodoro/StartDefaultPomodoro";
import { PausePomodoro } from "@/services/Pomodoro/PausePomodoro";
import { ResumePomodoro } from "@/services/Pomodoro/ResumePomodoro";
import { StopPomodoro } from "@/services/Pomodoro/StopPomodoro";
import { CommandAction } from "@/interfaces/Pomodoro/Commands";
import { StartPomodoroById } from "@/services/Pomodoro/StartPomodoroById";

export default function CommandsUtils() {
  const status = useStatus();
  const { handleJoinPomodoro } = useWebSocketStore((state) => state.actions);

  const { togglePlay, resetTimer, setStartedElement } = useTimerStore(
    (state) => state.actions
  );
  const isChronometer = useIsChronometer();
  const startedElement = useStartedElement();

  const { setIsOpen } = useModalStore((state) => state.actions);
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
        if (status.pausedState === "paused") {
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
