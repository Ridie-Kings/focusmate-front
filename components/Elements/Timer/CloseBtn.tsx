import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function CloseBtn({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="absolute top-10 bg-[#414040] p-2 rounded-full cursor-pointer"
      onClick={() => setIsOpen(false)}
    >
      <X className="text-white-100 size-9" />
    </div>
  );
}
