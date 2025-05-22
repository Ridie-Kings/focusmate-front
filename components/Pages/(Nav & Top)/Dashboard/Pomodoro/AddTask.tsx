import { DashboardContext } from "@/components/Provider/DashboardProvider";
import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { TaskType } from "@/interfaces/Task/TaskType";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import { AddTaskToPomodoro } from "@/services/Pomodoro/AddTaskToPomodoro";
import { RemoveTaskFromPomodoro } from "@/services/Pomodoro/RemoveTaskFromPomodoro";
import { X } from "lucide-react";
import { useContext, useState } from "react";

export default function AddTask({
  status,
  pomodoroId,
}: {
  status: PomodoroStatusType | null;
  pomodoroId: string | undefined;
}) {
  const { tasks } = useContext(DashboardContext);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(
    status?.task ?? null
  );
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);

  const handleAddTaskToPomodoro = async (task: TaskType | null) => {
    if (!task || !pomodoroId) return;

    setSelectedTask(task);
    try {
      const res = await AddTaskToPomodoro({ taskId: task?._id, pomodoroId });

      if (res.success) {
        console.log("Tarea añadida al pomodoro");
      } else {
        console.log("Error al añadir la tarea al pomodoro");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveTaskFromPomodoro = async () => {
    if (!pomodoroId) return;

    try {
      const res = await RemoveTaskFromPomodoro({
        pomodoroId,
      });

      if (res.success) {
        console.log("Tarea eliminada del pomodoro");
        setSelectedTask(null);
      } else {
        console.log("Error al eliminar la tarea del pomodoro");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const items = tasks.map((task) => ({
    label: task.title,
    onClick: () => handleAddTaskToPomodoro(task),
  }));

  return (
    <div
      style={{ width: isSelectedMenu ? 448 : 214 }}
      className="mx-auto flex place-content-between items-center justify-end relative border-2 p-1 border-secondary-100 rounded-lg transition-all duration-300"
    >
      <p className="text-sm text-gray-400 absolute left-1">
        {selectedTask ? selectedTask.title : "Ninguna tarea seleccionada"}
      </p>
      {selectedTask ? (
        <button
          onClick={() => handleRemoveTaskFromPomodoro()}
          className="bg-secondary-100 rounded cursor-pointer"
        >
          <X />
        </button>
      ) : (
        <ButtonDropDown
          position="top"
          items={items}
          onClick={() => setIsSelectedMenu(true)}
          className="bg-secondary-100 py-1 rounded text-sm text-primary-500"
        >
          Añade aqui tu tarea
        </ButtonDropDown>
      )}
    </div>
  );
}
