import { TaskType } from "@/interfaces/Task/TaskType";
import { PomodoroStatusType } from "@/interfaces/websocket/WebSocketProvider";
import { AddTaskToPomodoro } from "@/services/Pomodoro/AddTaskToPomodoro";
import { CreatePomodoro } from "@/services/Pomodoro/CreatePomodoro";
import { RemoveTaskFromPomodoro } from "@/services/Pomodoro/RemoveTaskFromPomodoro";
import { Dispatch, SetStateAction } from "react";
import { useWebSocketStore } from "@/stores/websocketStore";

export default function AddTaskUtils({
  status,
  pomodoroId,
  setSelectedTask,
}: {
  status: PomodoroStatusType | null;
  pomodoroId: string | undefined;
  setSelectedTask: Dispatch<SetStateAction<TaskType | null>>;
}) {
  const { handleJoinPomodoro } = useWebSocketStore((state) => state.actions);

  const handleAddTaskToPomodoro = async (task: TaskType | null) => {
    if (!task) return;

    try {
      const targetPomodoroId = status
        ? pomodoroId
        : (await CreatePomodoro({})).res._id;

      if (!targetPomodoroId) throw new Error("No pomodoro ID available");

      if (!status) {
        handleJoinPomodoro(targetPomodoroId);
      }

      const res = await AddTaskToPomodoro({
        taskId: task._id,
        pomodoroId: targetPomodoroId,
      });

      if (res.success) {
        setSelectedTask(task);
      }
    } catch (error) {
      console.log(error);
      setSelectedTask(null);
    }
  };

  const handleRemoveTaskFromPomodoro = async () => {
    if (!pomodoroId) return;

    try {
      const res = await RemoveTaskFromPomodoro({ pomodoroId });
      if (res.success) {
        setSelectedTask(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleAddTaskToPomodoro,
    handleRemoveTaskFromPomodoro,
  };
}
