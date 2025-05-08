"use client";
import TemplateDashboard from "../../../Elements/General/TemplateBox";
import Timer from "./Pomodoro/Timer";
import { useContext, useState } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import Commands from "@/components/Elements/Pomodoro/Commands";
import { AlarmClock, Clock, Timer as TimerIcon, X } from "lucide-react";
import { TaskType } from "@/interfaces/Task/TaskType";
import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { DashboardContext } from "@/components/Provider/DashboardProvider";

export default function Pomodoro() {
  const { tasks } = useContext(DashboardContext);
  const { isType, setIsType } = useContext(TimerContext);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>();
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);

  const items = tasks.map((task) => ({
    label: task.title,
    onClick: () => setSelectedTask(task),
  }));

  return (
    <TemplateDashboard
      grid="col-span-3 row-span-3"
      title={isType}
      link="/pomodoro"
      items={[
        {
          label: "Pomodoro",
          icon: <Clock />,
          onClick: () => setIsType("pomodoro"),
        },
        {
          label: "Cronometro",
          icon: <TimerIcon />,
          onClick: () => setIsType("cronometro"),
        },
        {
          label: "Temporizador",
          icon: <AlarmClock />,
          onClick: () => setIsType("temporizador"),
        },
      ]}
    >
      <Timer />
      <div
        style={{ width: isSelectedMenu ? 448 : 246 }}
        className="mx-auto flex place-content-between items-center justify-end relative border-2 p-1 border-secondary-100 rounded-lg transition-all duration-300"
      >
        <p className="text-sm text-gray-400 absolute left-1">
          {selectedTask ? selectedTask.title : "Ninguna tarea seleccionada"}
        </p>
        {selectedTask ? (
          <button
            onClick={() => setSelectedTask(null)}
            className="bg-secondary-100 rounded cursor-pointer"
          >
            <X />
          </button>
        ) : (
          <ButtonDropDown
            items={items}
            onClick={() => setIsSelectedMenu(true)}
            className="bg-secondary-100 px-0 rounded text-sm text-primary-500"
          >
            Añade aqui tu tarea
          </ButtonDropDown>
        )}
      </div>
      <Commands fullScreen={false} />
    </TemplateDashboard>
  );
}
