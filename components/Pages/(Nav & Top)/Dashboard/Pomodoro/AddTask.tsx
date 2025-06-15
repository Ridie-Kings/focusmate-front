"use client";
import { useTasks } from "@/stores/dashboardStore";
import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { TaskType } from "@/interfaces/Task/TaskType";
import AddTaskUtils from "@/lib/Pomodoro/AddTaskUtils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useStatus } from "@/stores/websocketStore";

export default function AddTask() {
  const status = useStatus();

  const tasks = useTasks();
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(
    status?.task || null
  );
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);
  const t = useTranslations("Dashboard.pomodoro");

  const { handleAddTaskToPomodoro, handleRemoveTaskFromPomodoro } =
    AddTaskUtils({
      status,
      pomodoroId: status?._id,
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
      style={{ width: isSelectedMenu ? 448 : "" }}
      className="mx-auto min-w-40 flex place-content-between items-center justify-end relative border-2 p-1 border-secondary-100 rounded-lg transition-all duration-300"
      id="add-task-component"
    >
      <p className="text-sm text-gray-400 absolute left-2">
        {selectedTask ? selectedTask.title : t("addTask.noTaskSelected")}
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
            <p className="text-gray-500 text-sm z-10 bg-white w-full">
              {t("addTask.noTaskAvailable")}
            </p>
          ) : (
            <ButtonDropDown
              position="top"
              items={items}
              onClick={() => setIsSelectedMenu(true)}
              className="bg-secondary-100 py-1 rounded text-sm text-primary-500 flex-1"
            >
              {t("addTask.title")}
            </ButtonDropDown>
          )}
        </>
      )}
    </div>
  );
}
