import { Search, X } from "lucide-react";
import NotificationItem from "./NotificationItem";

export default function NotificationMenu({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-110 px-6 py-8 flex flex-col items-end gap-4 absolute right-0 top-10 bg-white z-50 border border-accent rounded-2xl drop-shadow-2xl">
      <X size={24} onClick={onClick} className="cursor-pointer" />
      <div className="flex flex-col justify-center gap-4 w-full relative">
        <input
          type="text"
          className="px-4 py-2 text-accent w-full border-2 border-accent rounded-full"
          placeholder="Buscar"
        />
        <Search className="absolute right-3 text-accent cursor-pointer" />
      </div>
      <ul className="w-full flex flex-col gap-4 max-h-70 overflow-y-auto">
        <NotificationItem />
      </ul>
    </div>
  );
}
