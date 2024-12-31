export default function PriorityBadge({ priority }: { priority: string }) {
  return (
    <div className="flex gap-2 px-3 py-0.5 items-center rounded-md bg-white-100">
      <div
        className={`w-4 h-4 rounded-full ${
          priority === "alta"
            ? "bg-red-500"
            : priority === "media"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      />
      <p className="text-sm">{priority}</p>
    </div>
  );
}
