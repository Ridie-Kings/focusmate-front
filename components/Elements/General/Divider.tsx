export default function Divider({
  width = "100%",
  height = "1px",
  backgroundColor = "#B0C8C5",
  className = "rounded-full",
}: {
  width?: string;
  height?: string;
  backgroundColor?: string;
  className?: string;
}) {
  return (
    <div style={{ width, height, backgroundColor }} className={className} />
  );
}
