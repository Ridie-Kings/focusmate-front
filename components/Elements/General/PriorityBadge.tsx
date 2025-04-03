export default function PriorityBadge({ priority }: { priority: string }) {
  return (
    <div
      className={`${
        priority === "high"
          ? "bg-[#fccbca] border border-[#f3403b]"
          : priority === "medium"
          ? "bg-[#ffeccd] border border-[#f27e11]"
          : "bg-[#aad1c4] border border-[#248277]"
      } flex gap-2 p-1 items-center place-content-between font-medium rounded-full`}
    >
      <div
        className={`w-4 h-4 rounded-full ${
          priority === "high"
            ? "bg-[#f3403b]"
            : priority === "medium"
            ? "bg-[#f27e11]"
            : "bg-[#248277]"
        }`}
      />
      <p className="text-xs text-gray-600">{priority}</p>
    </div>
  );
}
