import InputModal from "@/components/Reusable/InputModal";
import { Bell, Text, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function ModalTask({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-[600px] h-[568px] bg-background-primary rounded-2xl p-6 flex flex-col items-end gap-4 drop-shadow-2xl">
      <X onClick={() => setIsOpen("")} size={28} className="cursor-pointer" />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full place-content-between">
          <input
            type="text"
            placeholder="Titulo"
            className="text-2xl text-gray-500 outline-none"
          />
          <div className="size-6 bg-tertiary-400 rounded-full cursor-pointer" />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <InputModal type="text" placeholder="Descripcíon" icon={<Text />} />
          <InputModal
            type="select"
            placeholder="10 min. antes"
            option={
              <div className="absolute flex flex-col">
                {["10", "15", "20"]?.map((item) => (
                  <option>{item} min. antes</option>
                ))}
              </div>
            }
            icon={<Bell />}
          />
        </div>
      </div>
    </div>
  );
}
