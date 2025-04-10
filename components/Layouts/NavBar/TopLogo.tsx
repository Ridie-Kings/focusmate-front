import { Sparkles } from "lucide-react";

export default function TopLogo() {
  return (
    <div className="group relative flex items-center gap-3 mb-8 px-4 py-2 cursor-pointer">
      <span
        className="
        transition-all duration-300
        opacity-0 group-hover:opacity-100
      "
      >
        <Sparkles fill="white" size={24} />
      </span>

      <h1
        className="
        text-2xl font-extrabold text-white whitespace-nowrap
        transition-all duration-300
        opacity-0 group-hover:opacity-100
      "
      >
        SherpApp
      </h1>

      <span
        className="
        absolute left-1/2 -translate-x-1/2
        transition-all duration-300
        opacity-100 group-hover:opacity-0
      "
      >
        <Sparkles fill="white" size={24} />
      </span>
    </div>
  );
}
