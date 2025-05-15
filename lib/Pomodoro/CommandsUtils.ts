import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
import { useCallback, useContext } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import { StopPomodoro } from "@/services/Pomodoro/StopPomodoro";
import { ResumePomodoro } from "@/services/Pomodoro/ResumePomodoro";
import { PausePomodoro } from "@/services/Pomodoro/PausePomodoro";
import { StartDefaultPomodoro } from "@/services/Pomodoro/StartDefaultPomodoro";
import { StartPomodoroById } from "@/services/Pomodoro/StartPomodoroById";
import { ModalContext } from "@/components/Provider/ModalProvider";

export default function CommandsUtils() {
  const { status, handleJoinPomodoro, setStatus } = useContext(SocketIOContext);
  const { togglePlay, resetTimer, isPlay, startedElement, setStartedElement } =
    useContext(TimerContext);
  const { setIsOpen } = useContext(ModalContext);

  const handleClick = useCallback(
    async (action: string, disabled?: boolean) => {
      if (disabled) return;

      switch (action) {
        case "openFullScreen":
          break;

        case "togglePlay":
          if (!startedElement) {
            if (!status) {
              try {
                const res = await StartDefaultPomodoro();

                if (res.success) {
                  handleJoinPomodoro(res.res._id);
                  setStartedElement(true);
                }
                console.log("start default", res.res);
              } catch (error) {
                console.log("ERROR START DEFAULT", error);
              }
            } else {
              try {
                const res = await StartPomodoroById({ id: status._id });

                if (res.success) {
                  handleJoinPomodoro(res.res._id);
                }
                console.log("start", res.res);
              } catch (error) {
                console.log("ERROR START", error);
              }
            }
          } else {
            if (status) {
              try {
                if (isPlay) await PausePomodoro({ id: status._id });
                else await ResumePomodoro({ id: status._id });
                console.log(isPlay ? "pause" : "resume");
              } catch (error) {
                console.log("ERROR ", isPlay ? " resume " : " pause ", error);
              }
            }
          }
          togglePlay();
          break;

        case "reset":
          try {
            await StopPomodoro({ id: status?._id ?? "" });
            resetTimer();
            console.log("stop");
          } catch (error) {
            console.log("ERROR stop", error);
          }
          break;
        case "settings":
          setIsOpen({ text: "pomodoroSettings", other: status });
          break;
        default:
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
      setStatus,
    ]
  );

  return { handleClick };
}
