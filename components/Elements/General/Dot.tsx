export default function Dot({
  size,
  backgroundColor,
}: {
  size: number;
  backgroundColor?: string;
}) {
  return (
    <div
      style={{ backgroundColor, height: size, width: size }}
      className="bg-gray-100 rounded-full"
    />
  );
}
