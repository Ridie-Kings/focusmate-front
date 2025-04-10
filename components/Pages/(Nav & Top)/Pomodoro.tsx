import HistoryTimer from "./(Nav & Top)/Pomodoro/HistoryTimer";
import Timer from "./(Nav & Top)/Pomodoro/Timer";

export default function Pomodoro() {
  return (
    <div className="flex flex-1 gap-6 p-6 w-full">
      <Timer />
      <HistoryTimer />
    </div>
  );
}
