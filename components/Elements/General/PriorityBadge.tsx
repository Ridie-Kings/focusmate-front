export default function PriorityBadge({ priority }: { priority: string }) {
  return (
    <div className="flex gap-2 px-2 h-7 w-18 items-center place-content-between font-medium rounded-full bg-gray-100">
      <div
        className={`w-4 h-4 rounded-full ${
          priority === "high"
            ? "bg-red-500"
            : priority === "medium"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      />
      <p className="text-sm text-gray-600">{priority}</p>
    </div>
  );
}
