export default function DotTimer({
  dotColor,
  dotBorderColor,
}: {
  dotColor?: string;
  dotBorderColor?: string;
}) {
  return (
    <div
      className="size-7 flex justify-center items-center rounded-full bg-white z-1"
      style={{ border: dotBorderColor ?? "#8f9bb3" }}
    >
      <div
        className="size-5 rounded-full"
        style={{ backgroundColor: dotColor ?? "rgba(143,155,179, .25)" }}
      />
    </div>
  );
}
