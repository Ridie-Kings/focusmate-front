import Commands from "@/components/Elements/Pomodoro/Commands";
import Timer from "./Dashboard/Pomodoro/Timer";
import HistoryTimer from "./Pomodoro/HistoryTimer";
import PomodoroNav from "./Pomodoro/PomodoroNav";

export default function Pomodoro() {
  return (
    <div className="flex flex-1 gap-6 p-6 w-full">
      <div className="flex flex-col w-2/5 px-10 py-5 border-2 border-secondary-400 rounded-3xl  place-content-between">
        <PomodoroNav />
        <Timer />
        <Commands fullScreen={false} />
      </div>
      <HistoryTimer />
    </div>
  );
}
