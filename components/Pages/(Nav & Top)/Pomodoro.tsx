"use client";
import Commands from "@/components/Elements/Pomodoro/Commands";
import Timer from "./Dashboard/Pomodoro/PomodoroContainer";
import HistoryTimer from "./Pomodoro/HistoryTimer";
import { useTimerStore } from "@/stores/timerStore";
import { useWebSocketStore } from "@/stores/websocketStore";
import PomodoroNav from "./Pomodoro/PomodoroNav";
import AddTask from "./Dashboard/Pomodoro/AddTask";

export default function Pomodoro() {
  const { isChronometer } = useTimerStore();
  const { status } = useWebSocketStore();

  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-6 p-6 w-full">
      <div className="flex flex-col w-full overflow-hidden sm:w-2/5 px-4 gap-4 sm:px-10 py-5 border-2 border-secondary-400 rounded-3xl  place-content-between">
        <PomodoroNav />
        <Timer size="large" />
        {!isChronometer && <AddTask status={status} pomodoroId={status?._id} />}
        <Commands fullScreen={false} />
      </div>
      <HistoryTimer />
    </div>
  );
}
