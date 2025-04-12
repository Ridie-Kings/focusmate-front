import { X } from "lucide-react";

export default function CloseBtn({
  setIsOpen,
}: {
  setIsOpen: (type: boolean) => void;
}) {
  return (
    <div
      className="bg-accent/50 p-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:drop-shadow-2xl hover:scale-105 drop-shadow-xl xl:group-hover:opacity-100 xl:opacity-0"
      onClick={() => setIsOpen(false)}
    >
      <X className="text-white size-9" />
    </div>
  );
}
