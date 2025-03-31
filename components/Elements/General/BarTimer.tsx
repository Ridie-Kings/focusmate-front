import DotTimer from "./PomodoroComponent/DotTimer";

export default function BarTimer({
  barColor,
  dotColor,
  dotBorderColor,
}: {
  barColor?: string;
  dotColor?: string;
  dotBorderColor?: string;
}) {
  return (
    <div className=" w-3/4 flex place-content-between items-center rounded-full  relative mx-auto">
      <DotTimer dotBorderColor={dotBorderColor} dotColor={dotColor} />
      <DotTimer dotBorderColor={dotBorderColor} dotColor={dotColor} />
      <DotTimer dotBorderColor={dotBorderColor} dotColor={dotColor} />
      <DotTimer dotBorderColor={dotBorderColor} dotColor={dotColor} />
      <div className="h-0.5 w-full absolute bg-accent" />
    </div>
  );
}
