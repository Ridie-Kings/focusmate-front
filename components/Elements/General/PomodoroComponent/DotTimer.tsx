export default function DotTimer({
  dotColor,
  dotBorderColor,
}: {
  dotColor?: string;
  dotBorderColor?: string;
}) {
  return (
    <div className="size-7 flex justify-center items-center rounded-full bg-white z-1 border-2 border-accent">
      <div className="size-4 bg-accent rounded-full" />
    </div>
  );
}
