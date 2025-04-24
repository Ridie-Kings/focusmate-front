export default function Skeleton({
  width = "100%",
  height = "100%",
  type = "square",
}: {
  width: string;
  height: string;
  type: "square" | "circular";
}) {
  switch (type) {
    case "square":
      return <div style={{ width, height }} className="animate-pulse" />;
    case "circular":
      return (
        <div
          style={{ width, height: width }}
          className="animate-pulse rounded-full"
        />
      );
    default:
      return <div style={{ width, height }} className="animate-pulse" />;
  }
}
