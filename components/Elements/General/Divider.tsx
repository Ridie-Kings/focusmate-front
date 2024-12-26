export default function Divider({
  width = "100%",
  height = "2px",
  backgroundColor = "#8F9BB3",
  className = "",
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
