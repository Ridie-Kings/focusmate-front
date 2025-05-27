import { Dispatch, SetStateAction, useContext, useState } from "react";
import Input from "@/components/Reusable/Input";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import BtnSend from "./Modal/BtnSend";
import { TypeIsOpen } from "@/components/Provider/ModalProvider";
import { CreatePomodoro } from "@/services/Pomodoro/CreatePomodoro";
import { SocketIOContext } from "@/components/Provider/WebsocketProvider";
import { UpdatePomodoroById } from "@/services/Pomodoro/UpdatePomodoroById";

export default function ModalPomodoroSettings({
  status,
  setIsOpen,
}: {
  status: PomodoroStatusType;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
}) {
  const { handleJoinPomodoro } = useContext(SocketIOContext);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    pomodoroDuration: status?.workDuration / 60 || 25,
    shortBreakDuration: status?.shortBreak / 60 || 5,
    longBreakDuration: status?.longBreak / 60 || 15,
    rounds: status?.cycles || 4,
  });

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
    } else {
      const res = await CreatePomodoro({
        shortBreak: settings.shortBreakDuration * 60,
        longBreak: settings.longBreakDuration * 60,
        cycles: settings.rounds,
        workDuration: settings.pomodoroDuration * 60,
      });
      if (res.success) handleJoinPomodoro(res.res._id);
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
          name="pomodoroDuration"
          type="text"
          maxLength={3}
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
          name="shortBreakDuration"
          type="text"
          maxLength={3}
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
          name="longBreakDuration"
          type="text"
          maxLength={3}
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
          name="rounds"
          type="text"
          maxLength={2}
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
