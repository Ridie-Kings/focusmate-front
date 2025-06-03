import { useTranslations } from "next-intl";

export default function PriorityBadge({
  priority,
  status,
  className,
  style,
}: {
  priority: string;
  status: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const t = useTranslations("Dashboard.tasks");
  const trad = () => {
    if (status === "completed") return t("completed");
    else
      switch (priority) {
        case "high":
          return t("priority.high");
        case "medium":
          return t("priority.medium");
        case "low":
          return t("priority.low");
        default:
          return "";
      }
  };

  return (
    <div
      style={style}
      className={`${className} ${
        status !== "completed"
          ? priority === "high"
            ? "bg-[#fccbca] border border-[#f3403b]"
            : priority === "medium"
            ? "bg-[#ffeccd] border border-[#f27e11]"
            : priority === "low"
            ? "bg-[#aad1c4] border border-[#248277]"
            : "bg-black/25 border border-black"
          : "bg-black/25 border border-black"
      } flex gap-2 py-1 px-2 items-center place-content-between font-medium rounded-full`}
    >
      <div
        className={`w-4 h-4 rounded-full transition-all duration-1000 ${
          status !== "completed"
            ? priority === "high"
              ? "bg-[#f3403b]"
              : priority === "medium"
              ? "bg-[#f27e11]"
              : priority === "low"
              ? "bg-[#248277]"
              : "bg-black"
            : "bg-black"
        }`}
      />
      <p className="text-xs text-gray-600">{trad() ?? "Unknown Priority"}</p>
    </div>
  );
}
