export default function PriorityBadge({ priority }: { priority: string }) {
  const trad = () => {
    switch (priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Media";
      case "low":
        return "Baja";
      default:
        return "";
    }
  };

  return (
    <div
      className={`${
        priority === "high"
          ? "bg-[#fccbca] border border-[#f3403b]"
          : priority === "medium"
          ? "bg-[#ffeccd] border border-[#f27e11]"
          : priority === "low"
          ? "bg-[#aad1c4] border border-[#248277]"
          : "bg-black/25 border border-black"
      } flex gap-2 py-1 px-2 items-center place-content-between font-medium rounded-full`}
    >
      <div
        className={`w-4 h-4 rounded-full ${
          priority === "high"
            ? "bg-[#f3403b]"
            : priority === "medium"
            ? "bg-[#f27e11]"
            : priority === "low"
            ? "bg-[#248277]"
            : "bg-black"
        }`}
      />
      <p className="text-xs text-gray-600">{trad() ?? "Unknown Priority"}</p>
    </div>
  );
}
