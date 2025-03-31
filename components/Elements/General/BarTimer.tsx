import DotTimer from "./PomodoroComponent/DotTimer";

export default function BarTimer() {
  return (
    <div className=" w-3/4 flex place-content-between items-center rounded-full  relative mx-auto">
      <DotTimer />
      <DotTimer />
      <DotTimer />
      <DotTimer />
      <div className="h-0.5 w-full absolute bg-accent" />
    </div>
  );
}
