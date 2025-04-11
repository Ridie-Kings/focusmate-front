export default function DotTimer({ color = "#b0c8c5" }: { color?: string }) {
  return (
    <div
      style={{ borderColor: color }}
      className="size-4 flex justify-center items-center rounded-full bg-white z-1 border-2"
    >
      <div style={{ backgroundColor: color }} className="size-2 rounded-full" />
    </div>
  );
}
