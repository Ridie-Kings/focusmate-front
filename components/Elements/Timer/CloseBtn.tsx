import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function CloseBtn({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="bg-[#414040] p-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:drop-shadow-2xl hover:scale-105 drop-shadow-xl xl:group-hover:opacity-100 xl:opacity-0"
      onClick={() => setIsOpen(false)}
    >
      <X className="text-white-100 size-9" />
    </div>
  );
}
