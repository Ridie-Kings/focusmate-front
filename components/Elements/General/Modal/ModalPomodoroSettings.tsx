import { Dispatch, SetStateAction, useState } from "react";
import Input from "@/components/Reusable/Input";
import { PomodoroStatus } from "@/interfaces/websocket/WebSocketProvider";
import BtnSend from "./Modal/BtnSend";
import { TypeIsOpen } from "@/components/Provider/ModalProvider";
import { CreatePomodoro } from "@/services/Pomodoro/CreatePomodoro";

export default function ModalPomodoroSettings({
  status,
  setIsOpen,
}: {
  status: PomodoroStatus;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    pomodoroDuration: status?.workDuration || 25,
    shortBreakDuration: status?.shortBreak || 5,
    longBreakDuration: status?.longBreak || 15,
    rounds: status?.cycles || 4,
  });

  const handleChange = (field: string, value: number) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    if (status) {
    } else {
      const res = await CreatePomodoro({
        shortBreak: settings.shortBreakDuration,
        longBreak: settings.longBreakDuration,
        cycles: settings.rounds,
        workDuration: settings.pomodoroDuration,
      });
      console.log(res);
    }
    setIsOpen({ text: "" });
  };

  return (
    <form className="w-full flex flex-col gap-4">
      <p className="text-center font-semibold text-2xl">
        Configuración del pomodoro
      </p>
      <div className="flex items-center justify-between w-full gap-3">
        <p className="flex-1">Duración del pomodoro:</p>
        <Input
          label=""
          name="pomodoroDuration"
          field={1}
          defaultValue={settings.pomodoroDuration.toString()}
          placeholder="25"
          onChange={(e) =>
            handleChange("pomodoroDuration", parseInt(e.target.value))
          }
        />
      </div>
      <div className="flex items-center justify-between w-full gap-3">
        <p className="flex-1">Duración del descanso corto:</p>
        <Input
          label=""
          name="shortBreakDuration"
          field={1}
          defaultValue={settings.shortBreakDuration.toString()}
          placeholder="5"
          onChange={(e) =>
            handleChange("shortBreakDuration", parseInt(e.target.value))
          }
        />
      </div>
      <div className="flex items-center justify-between w-full gap-3">
        <p className="flex-1">Duración del descanso largo:</p>
        <Input
          label=""
          name="longBreakDuration"
          field={1}
          defaultValue={settings.longBreakDuration.toString()}
          placeholder="15"
          onChange={(e) =>
            handleChange("longBreakDuration", parseInt(e.target.value))
          }
        />
      </div>
      <div className="flex items-center justify-between w-full gap-3">
        <p className="flex-1">Número de vueltas:</p>
        <Input
          label=""
          name="rounds"
          field={1}
          defaultValue={settings.rounds.toString()}
          placeholder="4"
          onChange={(e) => handleChange("rounds", parseInt(e.target.value))}
        />
      </div>
      <div className="mt-4">
        <BtnSend
          text={"Modificar"}
          loadingText={"Modificando..."}
          handleClick={handleSubmit}
          isLoading={isLoading}
          setIsOpen={setIsOpen}
        />
      </div>
    </form>
  );
}
