export default function TimeBar({ pos }: { pos: number }) {
  return (
    <div className="h-full  w-full absolute top-0 left-0 z-10 pointer-events-none">
      <div
        className="absolute left-0 right-0 h-0.5 bg-primary-500"
        style={{
          top: `${pos}px`,
        }}
      />
    </div>
  );
}
