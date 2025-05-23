import { DashboardContext } from "@/components/Provider/DashboardProvider";
import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { TaskType } from "@/interfaces/Task/TaskType";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import AddTaskUtils from "@/lib/Pomodoro/AddTaskUtils";
import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function AddTask({
  status,
  pomodoroId,
}: {
  status: PomodoroStatusType | null;
  pomodoroId: string | undefined;
}) {
  const { tasks } = useContext(DashboardContext);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(
    status?.task || null
  );
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);

  const { handleAddTaskToPomodoro, handleRemoveTaskFromPomodoro } =
    AddTaskUtils({
      status,
      pomodoroId,
      setSelectedTask,
    });

  useEffect(() => {
    setSelectedTask(status?.task || null);
  }, [status]);

  const items = tasks
    .filter((task) => task.status !== "completed" && task.status !== "dropped")
    .map((task) => ({
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
          onClick={handleRemoveTaskFromPomodoro}
          className="bg-secondary-100 rounded cursor-pointer"
        >
          <X />
        </button>
      ) : (
        <>
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm z-10 bg-white w-full">No tienes tareas disponibles</p>
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
        </>
      )}
    </div>
  );
}
