import HistoryTimer from "../Elements/Pages/Pomodoro/HistoryTimer";
import Timer from "../Elements/Pages/Pomodoro/Timer";

export default function Pomodoro() {
  return (
    <div className="flex flex-1 gap-6 p-6 w-full">
      <Timer />
      <HistoryTimer />
    </div>
  );
}
