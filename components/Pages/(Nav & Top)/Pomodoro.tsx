import HistoryTimer from "./Pomodoro/HistoryTimer";
import Timer from "./Pomodoro/Timer";

export default function Pomodoro() {
  return (
    <div className="flex flex-1 gap-6 p-6 w-full">
      <Timer />
      <HistoryTimer />
    </div>
  );
}
