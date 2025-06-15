import Input from "@/components/Reusable/Input";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import { useState } from "react";
import BtnSend from "./Modal/BtnSend";
import { CreatePomodoro } from "@/services/Pomodoro/CreatePomodoro";
import { UpdatePomodoroById } from "@/services/Pomodoro/UpdatePomodoroById";
import { useWebSocketStore } from "@/stores/websocketStore";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";
import { useTranslations } from "next-intl";

export default function ModalPomodoroSettings({
  status,
}: {
  status: PomodoroStatusType;
}) {
  const { handleJoinPomodoro } = useWebSocketStore((state) => state.actions);
  const { setIsOpen } = useModalStore((state) => state.actions);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    pomodoroDuration: status?.workDuration / 60 || 25,
    shortBreakDuration: status?.shortBreak / 60 || 5,
    longBreakDuration: status?.longBreak / 60 || 15,
    rounds: status?.cycles || 4,
  });
  const { addToast } = useToastStore();
  const tPomodoroSettings = useTranslations("Modal.pomodoroSettings");
  const tCommon = useTranslations("Common");

  const handleChange = (field: string, value: number) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    if (status) {
      const res = await UpdatePomodoroById({
        id: status._id,
        pomodoro: {
          shortBreak: settings.shortBreakDuration * 60,
          longBreak: settings.longBreakDuration * 60,
          cycles: settings.rounds,
          workDuration: settings.pomodoroDuration * 60,
        },
      });
      if (res.success) {
        addToast({
          type: "success",
          message: "Pomodoro actualizado correctamente",
        });
      }
    } else {
      const res = await CreatePomodoro({
        shortBreak: settings.shortBreakDuration * 60,
        longBreak: settings.longBreakDuration * 60,
        cycles: settings.rounds,
        workDuration: settings.pomodoroDuration * 60,
      });

      if (res.success) {
        handleJoinPomodoro(res.res._id);
      }
    }
    setIsOpen({ text: "" });
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label={tPomodoroSettings("pomodoroDuration")}
        type="number"
        name="pomodoroDuration"
        value={settings.pomodoroDuration.toString()}
        onChange={(e) =>
          handleChange("pomodoroDuration", Number(e.target.value))
        }
        className="flex-row grid grid-cols-2"
      />
      <Input
        label={tPomodoroSettings("shortBreakDuration")}
        type="number"
        name="shortBreakDuration"
        value={settings.shortBreakDuration.toString()}
        onChange={(e) =>
          handleChange("shortBreakDuration", Number(e.target.value))
        }
        className="flex-row grid grid-cols-2"
      />
      <Input
        label={tPomodoroSettings("longBreakDuration")}
        type="number"
        name="longBreakDuration"
        value={settings.longBreakDuration.toString()}
        onChange={(e) =>
          handleChange("longBreakDuration", Number(e.target.value))
        }
        className="flex-row grid grid-cols-2"
      />
      <Input
        label={tPomodoroSettings("rounds")}
        name="rounds"
        type="number"
        value={settings.rounds.toString()}
        onChange={(e) => handleChange("rounds", Number(e.target.value))}
        className="flex-row grid grid-cols-2"
      />
      <BtnSend
        setIsOpen={setIsOpen}
        handleClick={handleSubmit}
        isLoading={isLoading}
        text={tCommon("save")}
      />
    </div>
  );
}
