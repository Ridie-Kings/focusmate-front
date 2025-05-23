import { LogOut } from "lucide-react";

export default function LogoutButton({
  handleLogout,
}: {
  handleLogout: () => Promise<void>;
}) {
  return (
    <button
      className="
        group relative flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg
        bg-secondary-500/50 hover:bg-secondary-400/50 text-gray-300
        cursor-pointer transition-all duration-300 md:group-hover:w-full md:w-11 w-full
      "
      onClick={handleLogout}
      aria-label="Cerrar Sesión"
      type="button"
    >
      <span
        className="
        font-medium text-white whitespace-nowrap transition-all duration-300
        overflow-hidden md:max-w-0 group-hover:max-w-xs
        md:opacity-0 group-hover:opacity-100
      "
      >
        Cerrar Sesión
      </span>

      <span
        className="
        text-white transition-all duration-300
        opacity-0 md:group-hover:opacity-100
      "
      >
        <LogOut size={20} />
      </span>

      <span
        className="
        absolute right-2.5 text-white transition-all duration-300
        opacity-100 group-hover:opacity-0
      "
      >
        <LogOut size={20} />
      </span>
    </button>
  );
}
