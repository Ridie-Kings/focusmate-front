import Chronometer from "./Chronometer/Chronometer";
import PomodoroElement from "./PomodoroContainer/PomodoroElement";

export default function PomodoroContainer({ size }: { size: "medium" | "large" }) {
  return (
    <div
      id="timer-component"
      className="flex flex-col justify-center items-center gap-2 w-full flex-1 relative  min-h-[248px]"
    >
      <Chronometer />
      <PomodoroElement size={size} />
    </div>
  );
}
