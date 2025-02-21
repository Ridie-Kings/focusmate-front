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
    <div className=" w-full flex place-content-between items-center rounded-full  relative">
      <DotTimer dotBorderColor={dotBorderColor} dotColor={dotColor} />
      <DotTimer dotBorderColor={dotBorderColor} dotColor={dotColor} />
      <DotTimer dotBorderColor={dotBorderColor} dotColor={dotColor} />
      <DotTimer dotBorderColor={dotBorderColor} dotColor={dotColor} />
      <div
        className="h-0.5 w-full absolute"
        style={{ backgroundColor: barColor ?? "#8f9bb3" }}
      />
    </div>
  );
}
